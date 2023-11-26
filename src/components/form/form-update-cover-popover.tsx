'use client'

import { ElementRef, ReactNode, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useAction } from '@/hooks/useAction'
import { updateCover } from '@/actions/update-cover'

import { FormSubmit } from './form-submit'
import { FormPicker } from './form-picker'
import { Button } from '../ui/button'
import { useWindowsDimensions } from '@/hooks/useWindowsDimensions'
import { FEEDBACK_MESSAGES } from '@/constants/general'

interface FormUpdateCoverPopoverProps {
  children: ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  boardId: string
}

export function FormUpdateCoverPopover({
  children,
  align,
  side = 'bottom',
  sideOffset = 0,
  boardId,
}: FormUpdateCoverPopoverProps) {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { screenWidth } = useWindowsDimensions()

  const { execute, fieldErrors } = useAction(updateCover, {
    onSuccess: (data) => {
      toast.success(FEEDBACK_MESSAGES.COVER_UPDATED)
      closeRef?.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const image = formData.get('image') as string

    execute({ image, id: boardId })
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
          Atualizar capa
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
          <FormPicker id="image" errors={fieldErrors} />

          <FormSubmit className="w-full">Atualizar</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
