'use client'

import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { useState, useRef, ElementRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'

import { createList } from '@/actions/create-list'
import { useAction } from '@/hooks/useAction'

import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { ListWrapper } from './list-wrapper'
import { toast } from 'sonner'

export function ListForm() {
  const router = useRouter()
  const params = useParams()

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const boardId = params.boardId

  function enabledEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`Lista "${data.title}" criada!`)
      disableEditing()
      router.refresh()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeydown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({ title, boardId })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            placeholder="Escreva o título da lista"
            className="h-7 border-transparent px-2 py-1 text-sm
            font-medium transition hover:border-input focus:border-input"
          />
          <input hidden value={boardId} name="boardId" />

          <div className="flex items-center gap-x-1">
            <FormSubmit variant="default" className="w-[7.4375rem]">
              Adicionar lista
            </FormSubmit>
            <Button
              type="button"
              onClick={disableEditing}
              size="icon"
              variant="ghost"
              className="h-9 hover:bg-neutral-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enabledEditing}
        className="flex w-full items-center rounded-md bg-white/80 p-3
        text-sm font-medium transition hover:bg-white/50"
      >
        <Plus className="mr-2 h-4 w-4" />
        Adicione uma lista
      </button>
    </ListWrapper>
  )
}
