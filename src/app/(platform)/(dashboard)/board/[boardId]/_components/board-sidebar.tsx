import { Check, Compass, MoreVertical } from 'lucide-react'
import { Board } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { OrgInfo } from './org-info'
import { Separator } from '@/components/ui/separator'

interface BoardSidebarProps {
  board: Board
}

export function BoardSidebar({ board }: BoardSidebarProps) {
  console.log(board.id)
  return (
    <aside className="flex w-full flex-1 flex-col gap-2 bg-white pb-6">
      <OrgInfo />

      <div>
        <div className="flex w-full items-center justify-between px-6 pb-5 pt-10">
          <span className="font-medium uppercase text-neutral-400">
            Tarefas
          </span>
          <Button size="icon" variant="ghost" className="rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex w-full items-center justify-between px-6 py-2">
          <div className="flex w-full items-center gap-5">
            <div className="flex items-center justify-center rounded-lg bg-neutral-300 p-1">
              <Check className="h-4 w-4 text-neutral-500" />
            </div>
            <span className="text-lg font-semibold text-neutral-800">Hoje</span>
          </div>

          <div className="flex h-9 w-10 items-center justify-center rounded-lg bg-sand-200">
            <span className="font-semibold text-sand-500">0</span>
          </div>
        </div>

        <div className="mb-4 flex w-full items-center justify-between px-6 py-2">
          <div className="flex w-full items-center gap-5">
            <div className="flex items-center justify-center rounded-lg bg-neutral-300 p-1">
              <Compass className="h-4 w-4 text-neutral-500" />
            </div>
            <span className="text-lg font-semibold text-neutral-800">
              Prioridade
            </span>
          </div>

          <div className="flex h-9 w-10 items-center justify-center rounded-lg bg-red-200">
            <span className="font-semibold text-red-500">0</span>
          </div>
        </div>

        <div className="px-6">
          <Separator />
        </div>
      </div>
    </aside>
  )
}