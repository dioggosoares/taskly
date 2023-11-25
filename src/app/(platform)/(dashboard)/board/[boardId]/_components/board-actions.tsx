'use client'

import { MoreVertical, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DialogDeleteBoard } from '@/components/dialog'

interface BoardActionsProps {
  id: string
}

export function BoardActions({ id }: BoardActionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="transparent"
          size="icon"
          className="rounded-full hover:bg-neutral-300/50"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pb-3 pt-3"
        side="bottom"
        align="end"
        sideOffset={10}
      >
        <div className="pb-4">
          <h3 className="text-center text-sm font-semibold text-neutral-600">
            Ações do quadro
          </h3>
          <PopoverClose asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
        </div>
        <DialogDeleteBoard id={id}>
          <Button
            variant="ghost"
            onClick={() => {}}
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Deletar este quadro
          </Button>
        </DialogDeleteBoard>
      </PopoverContent>
    </Popover>
  )
}
