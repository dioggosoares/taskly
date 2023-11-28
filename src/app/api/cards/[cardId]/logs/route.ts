import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { FEEDBACK_MESSAGES } from '@/constants/general'

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } },
) {
  try {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
      return new NextResponse(FEEDBACK_MESSAGES.UNAUTHORIZED, { status: 401 })
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    })

    return NextResponse.json(auditLogs)
  } catch (error) {
    return new NextResponse(FEEDBACK_MESSAGES.ERROR_500, { status: 500 })
  }
}
