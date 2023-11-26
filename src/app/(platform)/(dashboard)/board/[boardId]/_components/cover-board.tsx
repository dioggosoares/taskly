import { PencilLine } from 'lucide-react'
import { Board } from '@prisma/client'
import Link from 'next/link'

import { BoardInfo } from './board-info'
import { FormUpdateCoverPopover } from '@/components/form/form-update-cover-popover'

interface CoverBoardProps {
  board: Board
}

export async function CoverBoard({ board }: CoverBoardProps) {
  if (!board) return

  return (
    <div
      className="relative flex min-h-[16rem] overflow-hidden rounded-xl
      bg-neutral-200/50 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <div className="flex w-full flex-col justify-between">
        <div className="flex w-full flex-1 justify-end p-4">
          <FormUpdateCoverPopover
            sideOffset={10}
            side="right"
            boardId={board.id}
          >
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full
            bg-neutral-50 transition-opacity duration-150 ease-linear hover:opacity-75"
            >
              <PencilLine className="h-6 w-6 text-neutral-900" />
            </button>
          </FormUpdateCoverPopover>
        </div>

        <div className="flex p-6">
          <BoardInfo board={board} />
        </div>

        <div className="absolute bottom-0 left-0 flex w-full justify-end">
          <Link
            href={board.imageLinkHTML}
            target="_blank"
            className="flex w-fit truncate rounded-tl-xl bg-black/50 p-2
            text-[.625rem] text-white opacity-70 hover:underline
            group-hover:opacity-100"
          >
            {board.imageUserName}
          </Link>
        </div>
      </div>
    </div>
  )
}
