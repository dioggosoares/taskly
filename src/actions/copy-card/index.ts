'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
// import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { FEEDBACK_MESSAGES } from '@/constants/general'

import { CopyCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const { id, boardId } = data
  let card

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    })

    if (!cardToCopy) {
      return {
        error: FEEDBACK_MESSAGES.NOT_FOUND_CARD,
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Cópia`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
      },
    })

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    return {
      error: FEEDBACK_MESSAGES.ERROR_COPY_CARD,
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
