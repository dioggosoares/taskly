import { HelpCircle, User2 } from 'lucide-react'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import dayjs from 'dayjs'

import { db } from '@/lib/db'
import { Hint } from '@/components/hint'
import { FormPopover } from '@/components/form/form-popover'
import { redirect } from 'next/navigation'
import { truncate } from '@/helpers/truncate'
import { Skeleton } from '@/components/ui/skeleton'

export async function BoardList() {
  const { orgId } = auth()

  if (!orgId) return redirect('/select-org')

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Seus quadros
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video h-full w-full overflow-hidden
            rounded-sm bg-neutral-200/70 bg-cover bg-center bg-no-repeat p-2"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <div className="flex w-full items-center justify-between">
              {board.title.length > 12 ? (
                <Hint sideOffset={0} description={board.title}>
                  <p className="relative text-xs font-semibold text-zinc-50 md:text-sm">
                    {truncate(board.title, 12)}
                  </p>
                </Hint>
              ) : (
                <p className="relative text-xs font-semibold text-zinc-50 md:text-sm">
                  {truncate(board.title, 12)}
                </p>
              )}
              <time className="relative text-[.625rem] font-medium text-zinc-200">
                {dayjs().from(board.createdAt)}
              </time>
            </div>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative flex aspect-video h-full w-full flex-col items-center
            justify-center gap-y-1 rounded-sm bg-neutral-200/70 transition hover:opacity-75"
          >
            <p className="text-sm text-neutral-500">Criar novo quadro</p>
            <span className="text-xs">5 restantes</span>
            <Hint
              sideOffset={45}
              description={`
            Os Workspaces gratuitos podem ter até 5 quadros. Para quadros ilimitados, faça um upgrade deste Workspace.
          `}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[.875rem] w-[.875rem]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoarList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <Skeleton className="mr-2 h-6 w-6" />
        <Skeleton className="h-7 w-36" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
      </div>
    </div>
  )
}
