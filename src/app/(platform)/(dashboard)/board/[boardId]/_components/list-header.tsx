'use client'

import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { useState, useRef, ElementRef } from 'react'
import { toast } from 'sonner'

import { FormInput } from '@/components/form/form-input'
import { Separator } from '@/components/ui/separator'
import { updateList } from '@/actions/update-list'
import { useAction } from '@/hooks/useAction'
import { ListActions } from './list-actions'
import { ListWithCards } from '@/@types'

interface ListItemProps {
  data: ListWithCards
  onAddCard: () => void
}

export function ListHeader({ data, onAddCard }: ListItemProps) {
  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  function enabledEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renomeado para "${data.title}".`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    if (title === data.title) return disableEditing

    execute({ title, id, boardId })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeydown)
  useOnClickOutside(formRef, disableEditing)

  return (
    <div
      className="flex flex-col gap-x-2 px-2 text-sm
      font-semibold"
    >
      <div
        className="flex items-start justify-between gap-x-2 pt-2 text-sm
        font-semibold"
      >
        {isEditing ? (
          <form
            action={handleSubmit}
            ref={formRef}
            className="flex-1 px-[.125rem]"
          >
            <input hidden id="id" name="id" value={data.id} readOnly />
            <input
              hidden
              id="boardId"
              name="boardId"
              value={data.boardId}
              readOnly
            />

            <FormInput
              ref={inputRef}
              onBlur={onBlur}
              id="title"
              placeholder="Escreva o nome da lista..."
              defaultValue={title}
              className="h-7 truncate border-transparent bg-transparent px-[7px]
              py-1 text-sm font-medium transition hover:border-input
              focus:border-input focus:bg-white"
            />
            <button type="submit" hidden />
          </form>
        ) : (
          <div
            onClick={enabledEditing}
            className="h-7 w-full cursor-pointer border-transparent px-2.5 py-1
            text-sm font-medium"
          >
            {title}
          </div>
        )}
        <ListActions onAddCard={onAddCard} data={data} />
      </div>

      <Separator />

      <div className="flex items-center justify-between px-2.5 py-2">
        <span className="text-xs font-medium text-neutral-400">Cartões</span>
        <div
          className="flex h-6 w-6 items-center justify-center rounded-md border-2
          border-dashed border-purple-200 text-xs font-normal"
        >
          {data.cards.length}
        </div>
      </div>
    </div>
  )
}
