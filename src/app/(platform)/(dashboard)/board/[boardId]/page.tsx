import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { CoverBoard } from './_components/cover-board'
import { db } from '@/lib/db'
import Image from 'next/image'

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
      <div className="flex w-full items-center gap-4">
        <div className="ml-4 flex w-auto items-center">
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center
            overflow-hidden rounded-full bg-neutral-300 pt-6 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=3347&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center
          overflow-hidden rounded-full bg-neutral-300 pt-6 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center
            overflow-hidden rounded-full bg-neutral-300 pt-6 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center
            overflow-hidden rounded-full bg-neutral-300 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1600481176431-47ad2ab2745d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
        </div>
        <span className="font-medium text-neutral-600">
          Membros desse quadro
        </span>
      </div>
    </div>
  )
}
