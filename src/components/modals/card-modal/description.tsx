import { toast } from 'sonner'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRef, ElementRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { CardWithList } from '@/@types'
import { Skeleton } from '@/components/ui/skeleton'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'
import { updateCard } from '@/actions/update-card'

interface DescriptionProps {
  data: CardWithList
}

export function Description({ data }: DescriptionProps) {
  const params = useParams()
  const queryClient = useQueryClient()

  const formRef = useRef<ElementRef<'form'>>(null)
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  function enabledEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeydown)
  useOnClickOutside(formRef, disableEditing)

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      toast.success(`Cartão "${data.title}" atualizado!`)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string
    const boardId = params.boardId as string

    execute({ id: data.id, description, boardId })
  }

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Descrição</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              id="description"
              ref={textareaRef}
              className="mt-2 w-full"
              placeholder="Adicione uma descrição mais detalhada"
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit className="w-16">Salvar</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            onClick={enabledEditing}
            className="min-h-[4.875rem] rounded-md bg-neutral-200 px-3.5 py-3
            text-sm font-medium"
          >
            {data.description || 'Adicione uma ou mais descrições...'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[4.875rem] w-full bg-neutral-200" />
      </div>
    </div>
  )
}
