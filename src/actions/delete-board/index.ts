'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
// import { createAuditLog } from '@/lib/create-audit-log'

import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'
import { FEEDBACK_MESSAGES } from '@/constants/general'
import { redirect } from 'next/navigation'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: FEEDBACK_MESSAGES.UNAUTHORIZED,
    }
  }

  const { id } = data

  try {
    await db.board.delete({
      where: {
        id,
        orgId,
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
      error: FEEDBACK_MESSAGES.ERROR_DELETE_BOARD,
    }
  }

  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
