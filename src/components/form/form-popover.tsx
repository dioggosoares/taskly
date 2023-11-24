'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useAction } from '@/hooks/useAction'
import { createBoard } from '@/actions/create-board'

import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { Button } from '../ui/button'
import error from 'next/error'
import { toast } from 'sonner'

interface FormPopoverProps {
  children: ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export function FormPopover({
  children,
  align,
  side = 'bottom',
  sideOffset = 0,
}: FormPopoverProps) {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data })
      toast.success('Quadro criado!')
    },
    onError: (error) => {
      console.error({ error })
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({ title })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Criar quadro
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Título do quadro"
              type="text"
              errors={fieldErrors}
            />
          </div>

          <FormSubmit className="w-full">Criar</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
