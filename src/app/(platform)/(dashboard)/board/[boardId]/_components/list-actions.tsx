'use client'

import { MoreVertical, X } from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { List } from '@prisma/client'
import { toast } from 'sonner'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FormSubmitList } from '@/components/form/form-submit-list'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/useAction'
import { copyList } from '@/actions/copy-list'

import { DeleteListModal } from '@/components/modals/delete-list-modal'

interface ListActionsProps {
  onAddCard: () => void
  data: List
}

export function ListActions({ data, onAddCard }: ListActionsProps) {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`Lista "${data.title}" copiada`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mb-1 h-auto w-auto p-2 hover:bg-neutral-300/50"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pb-3 pt-3"
        side="bottom"
        align="start"
        sideOffset={10}
      >
        <div className="pb-4">
          <h3 className="text-center text-sm font-semibold text-neutral-600">
            Ações da Lista
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

        <Button
          variant="ghost"
          onClick={onAddCard}
          className="h-auto w-full justify-start gap-3 rounded-none p-2 px-5
          text-sm font-normal"
        >
          Adicionar cartão...
        </Button>

        <form action={onCopy} className="mb-2">
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />

          <FormSubmitList
            variant="ghost"
            className="h-auto w-full justify-start gap-3 rounded-none p-2 px-5
            text-sm font-normal"
          >
            Copiar lista...
          </FormSubmitList>
        </form>

        <Separator />

        <DeleteListModal data={data}>
          <Button
            variant="ghost"
            onClick={() => {}}
            className="mt-2 h-auto w-full justify-start rounded-none p-2 px-5
            text-sm font-normal"
          >
            Deletar esta lista
          </Button>
        </DeleteListModal>
      </PopoverContent>
    </Popover>
  )
}
