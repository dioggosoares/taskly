import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { CoverBoard } from './_components/cover-board'
import { BoardHeader } from './_components/board-header'
import { db } from '@/lib/db'

interface BoardProps {
  params: {
    boardId: string
  }
}

export default async function Board({ params }: BoardProps) {
  const { orgId } = auth()
  const boardId = params.boardId

  if (!orgId) return redirect('/select-org')

  if (!boardId) return

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  })

  if (!board) return

  return (
    <div className="flex flex-1 flex-col gap-9 p-8">
      <CoverBoard board={board} />
      <BoardHeader />
    </div>
  )
}
