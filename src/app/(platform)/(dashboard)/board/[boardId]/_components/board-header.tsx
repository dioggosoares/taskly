import { SlidersHorizontal } from 'lucide-react'
import { Board } from '@prisma/client'
import Image from 'next/image'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { BoardViewMenu } from './board-view-menu'
import { BoardActions } from './board-actions'

interface BoardHeaderProps {
  board: Board
}

export function BoardHeader({ board }: BoardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="ml-4 flex items-center">
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center overflow-hidden
            rounded-full bg-neutral-300 pt-6 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=3347&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center overflow-hidden
            rounded-full bg-neutral-300 pt-6 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center overflow-hidden
            rounded-full bg-neutral-300 pt-6 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
          <button
            className="-ml-4 flex h-12 w-12 items-center justify-center overflow-hidden
            rounded-full bg-neutral-300 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://images.unsplash.com/photo-1600481176431-47ad2ab2745d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={48}
              height={48}
            />
          </button>
        </div>
        <span className="hidden font-medium text-neutral-600 md:block">+5</span>
      </div>

      <div className="flex items-center justify-end gap-5">
        <div className="hidden items-center gap-5 md:flex">
          <Button size="sm" className="gap-3">
            Filtros
            <SlidersHorizontal className="h-4 w-4" />
          </Button>

          <BoardViewMenu />
        </div>

        <Hint
          description="Administrador do Quadro"
          side="bottom"
          sideOffset={10}
          asChild
        >
          <button
            className="flex h-12 w-12 items-center justify-center
            overflow-hidden rounded-full bg-neutral-300 pt-2 shadow-md shadow-neutral-600 ring-2 ring-zinc-50"
          >
            <Image
              src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWVlJTWU4VUYxU3JqWkttNWhQT1NNeE9rUk8ifQ?width=80 1x,https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWVlJTWU4VUYxU3JqWkttNWhQT1NNeE9rUk8ifQ?width=160 2x"
              alt=""
              width={48}
              height={48}
            />
          </button>
        </Hint>

        <BoardActions board={board} />
      </div>
    </div>
  )
}
