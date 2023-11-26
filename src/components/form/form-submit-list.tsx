'use client'

import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface FormSubmitListProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary'
}

export const FormSubmitList = ({
  children,
  disabled,
  className,
  variant = 'primary',
}: FormSubmitListProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin text-neutral-900" />
      ) : (
        children
      )}
    </Button>
  )
}
