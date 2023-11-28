'use client'

import { Check, Compass, MoreVertical } from 'lucide-react'
import { Board } from '@prisma/client'
import Link from 'next/link'
import dayjs from 'dayjs'

import { OrgInfo } from './org-info'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { truncate } from '@/helpers/truncate'
import '@/lib/dayjs'
interface BoardSideBarProps {
  data: Board[]
}

export function BoardSidebar({ data }: BoardSideBarProps) {
  return (
    <aside className="flex w-full flex-1 flex-col gap-2 bg-white pb-6">
      <OrgInfo />

      <div className="px-6">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between pb-5 pt-10">
            <span className="font-medium text-neutral-400">Tarefas</span>
            <Button size="icon" variant="ghost" className="rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex w-full items-center justify-between py-2">
            <div className="flex w-full items-center gap-5">
              <div className="flex items-center justify-center rounded-lg bg-neutral-300 p-1">
                <Check className="h-4 w-4 text-neutral-500" />
              </div>
              <span className="font-semibold text-neutral-800">Hoje</span>
            </div>

            <div className="flex items-center justify-center rounded-lg bg-sand-200 px-2.5 py-1">
              <span className="font-semibold text-sand-500">0</span>
            </div>
          </div>

          <div className="mb-4 flex w-full items-center justify-between py-2">
            <div className="flex w-full items-center gap-5">
              <div className="flex items-center justify-center rounded-lg bg-neutral-300 p-1">
                <Compass className="h-4 w-4 text-neutral-500" />
              </div>
              <span className="font-semibold text-neutral-800">Prioridade</span>
            </div>

            <div className="flex items-center justify-center rounded-lg bg-red-200 px-2.5 py-1">
              <span className="font-semibold text-red-500">0</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between py-4">
            <span className="font-medium text-neutral-400">Quadros</span>
            <Button size="icon" variant="ghost" className="rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex w-full flex-col gap-3">
            {data.map((board) => (
              <Link
                key={board.id}
                href={`/board/${board.id}`}
                className="group relative flex aspect-video h-10 w-full overflow-hidden
                rounded-sm bg-neutral-200/70 bg-cover bg-center bg-no-repeat p-2"
                style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              >
                <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                <div className="flex w-full flex-col">
                  <div className="flex w-full flex-1 items-start">
                    <header className="z-50 flex w-full items-center justify-between">
                      {board.title.length > 22 ? (
                        <Hint sideOffset={0} description={board.title}>
                          <p className="relative text-xs font-semibold text-zinc-50 md:text-sm">
                            {truncate(board.title, 22)}
                          </p>
                        </Hint>
                      ) : (
                        <p className="relative text-xs font-semibold text-zinc-50 md:text-sm">
                          {truncate(board.title, 22)}
                        </p>
                      )}
                      <time className="relative text-[.625rem] font-medium text-zinc-200">
                        {dayjs().from(board.createdAt)}
                      </time>
                    </header>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
