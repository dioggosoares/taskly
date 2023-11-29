'use client'

import { ElementRef, ReactNode, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import dayjs from 'dayjs'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useAction } from '@/hooks/useAction'
import { useProModal } from '@/hooks/useProModal'
import { createBoard } from '@/actions/create-board'
import { useWindowsDimensions } from '@/hooks/useWindowsDimensions'

import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { FormPicker } from './form-picker'
import { Button } from '../ui/button'
import { FEEDBACK_MESSAGES } from '@/constants/general'

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
  const proModal = useProModal()
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { screenWidth } = useWindowsDimensions()

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success(FEEDBACK_MESSAGES.BOARD_CREATED, {
        description: `Hoje, ${dayjs(data.createdAt)
          .format('DD[ de ]MMMM[ de ]YYYY[ - ]HH:mm[h]')
          .toString()}`,
        duration: 2000,
      })
      closeRef?.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      toast.error(error)
      proModal.onOpen()
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string

    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={screenWidth! <= 784 ? 'bottom' : side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Criar quadro
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
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
