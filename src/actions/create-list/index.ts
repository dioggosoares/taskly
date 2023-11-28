'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-log'

import { CreateList } from './schema'
import { InputType, ReturnType } from './types'
import { FEEDBACK_MESSAGES } from '@/constants/general'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const { title, boardId } = data
  let list

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    })

    if (!board) {
      return {
        error: FEEDBACK_MESSAGES.NOT_FOUND_BOARD,
      }
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    })

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: FEEDBACK_MESSAGES.ERROR_CREATED_LIST,
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const createList = createSafeAction(CreateList, handler)
