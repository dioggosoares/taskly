import { notFound, redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { BoardSidebar } from './_components/board-sidebar'
import { db } from '@/lib/db'

export async function generateMetadata({
  params,
}: {
  params: { boardId: string }
}) {
  const { orgId } = auth()

  if (!orgId) {
    return {
      title: 'Quadro',
    }
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  return {
    title: board?.title ?? 'Quadro',
  }
}

export default async function BoardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { boardId: string }
}) {
  const { orgId } = auth()

  if (!orgId) return redirect('/select-org')

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  if (!board) notFound()

  return (
    <div className="mx-auto h-full bg-purple-300/10">
      <main className="relative mx-auto flex h-full pt-14">
        <div className="hidden w-80 flex-col lg:flex">
          <BoardSidebar board={board} />
        </div>
        {children}
      </main>
    </div>
  )
}
