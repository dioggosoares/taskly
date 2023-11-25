'use client'

import { ElementRef, useRef, useState } from 'react'
import { Board } from '@prisma/client'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/form-input'
import { updateBoard } from '@/actions/update-board'
import { useAction } from '@/hooks/useAction'

interface BoardTitleFormProps {
  board: Board
}

export function BoardTitleForm({ board }: BoardTitleFormProps) {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Quadro "${data.title}" atualizado!`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [title, setTitle] = useState(board.title)
  const [isEditing, setIsEditing] = useState(false)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({
      title,
      id: board.id,
    })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="h-12 border-none bg-transparent px-[.4375rem] py-1 text-4xl
          font-bold text-zinc-50 focus-visible:outline-none
          focus-visible:ring-transparent"
        />
      </form>
    )
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-4xl font-bold text-zinc-50"
    >
      {title}
    </Button>
  )
}
