import { PencilLine } from 'lucide-react'

import { db } from '@/lib/db'
import { OrgInfo } from './org-info'

interface CoverBoardProps {
  orgId: string
  boardId: string
}

export async function CoverBoard({ boardId, orgId }: CoverBoardProps) {
  if (!boardId) return null

  const imageBoard = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  })

  if (!imageBoard) return null

  return (
    <div
      className="relative flex h-64 w-full rounded-lg bg-neutral-200/50 bg-cover
      bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageBoard.imageFullUrl})` }}
    >
      <div className="flex w-full flex-col justify-between">
        <div className="flex w-full flex-1 justify-end p-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50/30">
            <PencilLine className="h-6 w-6 text-zinc-50" />
          </button>
        </div>

        <div className="flex p-6">
          <OrgInfo />
        </div>
      </div>
    </div>
  )
}
