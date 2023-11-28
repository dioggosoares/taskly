'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
// import { createAuditLog } from '@/lib/create-audit-log'

import { UpdateCard } from './schema'
import { InputType, ReturnType } from './types'
import { FEEDBACK_MESSAGES } from '@/constants/general'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const { id, boardId, ...values } = data
  let card

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    })

    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.UPDATE,
    // })
  } catch (error) {
    return {
      error: FEEDBACK_MESSAGES.ERROR_UPDATED_CARD,
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)
