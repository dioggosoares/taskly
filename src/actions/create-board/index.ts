'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { FEEDBACK_MESSAGES } from '@/constants/general'

import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'
import { incrementAvailableCount, hasAvailableCount } from '@/lib/org-limits'

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const canCreate = await hasAvailableCount()

  if (!canCreate) {
    return {
      error: FEEDBACK_MESSAGES.LIMIT_BOARD_REACHED,
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|')

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: FEEDBACK_MESSAGES.MISSING_FIELDS_CREATED_BOARD,
    }
  }

  let board

  try {
    board = await db.board.create({
      data: {
        title,
        orgId: orgId ?? '',
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    })

    await incrementAvailableCount()

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: FEEDBACK_MESSAGES.ERROR_CREATED_BOARD,
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
