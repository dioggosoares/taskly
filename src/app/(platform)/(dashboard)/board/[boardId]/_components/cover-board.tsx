import { PencilLine } from 'lucide-react'

import { db } from '@/lib/db'
import { OrgInfo } from './org-info'
import Link from 'next/link'

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
      className="relative flex h-64 w-full overflow-hidden rounded-xl bg-neutral-200/50
      bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageBoard.imageFullUrl})` }}
    >
      <div className="flex w-full flex-col justify-between">
        <div className="flex w-full flex-1 justify-end p-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full
            bg-neutral-50 transition-opacity duration-150 ease-linear hover:opacity-75"
          >
            <PencilLine className="h-6 w-6 text-neutral-900" />
          </button>
        </div>

        <div className="flex p-6">
          <OrgInfo />
        </div>

        <div className="absolute bottom-0 left-0 flex w-full justify-end">
          <Link
            href={imageBoard.imageLinkHTML}
            target="_blank"
            className="flex w-fit truncate rounded-tl-xl bg-black/50 p-2
            text-[.625rem] text-white opacity-70 hover:underline
            group-hover:opacity-100"
          >
            {imageBoard.imageUserName}
          </Link>
        </div>
      </div>
    </div>
  )
}
