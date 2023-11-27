'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'
import { FEEDBACK_MESSAGES } from '@/constants/general'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const { items, boardId } = data
  let updatedCards

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    )

    updatedCards = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: FEEDBACK_MESSAGES.ERROR_REORDER_CARD,
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
