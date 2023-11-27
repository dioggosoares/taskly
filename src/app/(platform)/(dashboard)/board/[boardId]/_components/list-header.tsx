'use client'

import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { useState, useRef, ElementRef } from 'react'
import { List } from '@prisma/client'
import { toast } from 'sonner'

import { FormInput } from '@/components/form/form-input'
import { updateList } from '@/actions/update-list'
import { useAction } from '@/hooks/useAction'
import { ListActions } from './list-actions'

interface ListItemProps {
  data: List
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
      className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm
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
  )
}
