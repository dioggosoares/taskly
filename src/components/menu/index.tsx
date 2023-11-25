import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'

interface MenuProps extends ComponentProps<'div'> {
  children: ReactNode
}

export function Menu({ children, ...props }: MenuProps) {
  return (
    <div
      {...props}
      className={cn('flex w-full items-center gap-1', props.className)}
    >
      {children}
    </div>
  )
}
