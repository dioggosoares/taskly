import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { FEEDBACK_MESSAGES } from '@/constants/general'

export async function incrementAvailableCount() {
  const { orgId } = auth()

  if (!orgId) throw new Error(FEEDBACK_MESSAGES.UNAUTHORIZED)

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (orgLimit) {
    return await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    })
  }

  await db.orgLimit.create({
    data: {
      orgId,
      count: 1,
    },
  })
}

export async function decreaseAvailableCount() {
  const { orgId } = auth()

  if (!orgId) throw new Error(FEEDBACK_MESSAGES.UNAUTHORIZED)

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (orgLimit) {
    return await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    })
  }

  await db.orgLimit.create({
    data: {
      orgId,
      count: 1,
    },
  })
}

export async function hasAvailableCount() {
  const { orgId } = auth()

  if (!orgId) throw new Error(FEEDBACK_MESSAGES.UNAUTHORIZED)

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true
  }

  return false
}

export async function getAvailableCount() {
  const { orgId } = auth()

  if (!orgId) throw new Error(FEEDBACK_MESSAGES.UNAUTHORIZED)

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (!orgLimit) {
    return 0
  }

  return orgLimit.count
}
