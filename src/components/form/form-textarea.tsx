'use client'

import { ComponentProps, KeyboardEventHandler, forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { FormErrors } from './form-errors'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface FormTextareaProps extends ComponentProps<'textarea'> {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  defaultValue?: string
  onBlur?: () => void
  onClick?: () => void
  onKeydown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      className,
      placeholder,
      required,
      disabled,
      errors,
      defaultValue = '',
      onBlur,
      onClick,
      onKeydown,
    },
    ref,
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            onKeyDown={onKeydown}
            onBlur={onBlur}
            onClick={onClick}
            id={id}
            ref={ref}
            name={id}
            required={required}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn(
              `resize-none shadow-sm outline-none ring-0 focus:ring-0
              focus-visible:ring-0 focus-visible:ring-offset-0`,
              className,
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  },
)

FormTextarea.displayName = 'FormTextarea'
