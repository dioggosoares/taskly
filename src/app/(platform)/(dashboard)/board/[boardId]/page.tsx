import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { CoverBoard } from './_components/cover-board'

interface BoardProps {
  params: {
    boardId: string
  }
}

export default function Board({ params }: BoardProps) {
  const { orgId } = auth()
  const boardId = params.boardId

  if (!orgId) return redirect('/select-org')

  return (
    <div className="flex flex-1 p-8">
      <CoverBoard boardId={boardId} />
    </div>
  )
}
