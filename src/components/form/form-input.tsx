'use client'

import { ComponentProps, forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormErrors } from './form-errors'

import { cn } from '@/lib/utils'

interface FormInputProps extends ComponentProps<'input'> {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  defaultValue?: string
  onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      className,
      placeholder,
      required,
      disabled,
      errors,
      defaultValue = '',
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            type={type}
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn('h-7 px-2 py-1 text-sm', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  },
)

FormInput.displayName = 'FormInput'
