import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { CoverBoard } from './_components/cover-board'
import { BoardHeader } from './_components/board-header'
import { ListContainer } from './_components/list-container'

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

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <div className="flex flex-1 flex-col gap-9 p-8">
      <CoverBoard board={board} />
      <BoardHeader board={board} />
      <div className="flex h-full overflow-x-auto p-4">
        <ListContainer boardId={boardId} data={lists} />
      </div>
    </div>
  )
}
