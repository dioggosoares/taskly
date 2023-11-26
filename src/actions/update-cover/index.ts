'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { UpdateCover } from './schema'
import { InputType, ReturnType } from './types'
import { createSafeAction } from '@/lib/create-safe-action'
import { FEEDBACK_MESSAGES } from '@/constants/general'

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const { id, image } = data

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
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    })
  } catch (error) {
    return {
      error: FEEDBACK_MESSAGES.ERROR_UPDATED_COVER,
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const updateCover = createSafeAction(UpdateCover, handler)