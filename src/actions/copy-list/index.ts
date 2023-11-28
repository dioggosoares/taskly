'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { FEEDBACK_MESSAGES } from '@/constants/general'

import { CopyList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const { id, boardId } = data
  let list

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    })

    if (!listToCopy) {
      return { error: FEEDBACK_MESSAGES.NOT_FOUND_LIST }
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Cópia`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
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
      error: FEEDBACK_MESSAGES.ERROR_COPY_LIST,
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
