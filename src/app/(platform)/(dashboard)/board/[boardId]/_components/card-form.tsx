'use client'

import { Plus, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { createCard } from '@/actions/create-card'
import { useAction } from '@/hooks/useAction'
import { toast } from 'sonner'

interface CardFormProps {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Cartão "${data.title}" criado!`)
        formRef.current?.reset()
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

    const onTextAreakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string
      const listId = formData.get('listId') as string
      const boardId = params.boardId as string

      execute({ title, boardId, listId })
    }

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextAreakeyDown}
            ref={ref}
            placeholder="Escreva um título para esse cartão..."
            errors={fieldErrors}
          />

          <input hidden id="listId" name="listId" value={listId} readOnly />

          <div className="flex items-center gap-x-1">
            <FormSubmit className="min-w-[8.5rem]">Adicionar cartão</FormSubmit>
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
      )
    }

    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm
          text-muted-foreground hover:bg-neutral-300"
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar um cartão
        </Button>
      </div>
    )
  },
)

CardForm.displayName = 'CardForm'
