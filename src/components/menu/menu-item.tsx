'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

import { ComponentProps, forwardRef } from 'react'

interface MenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ComponentProps<'button'> {
  title: string
  active?: string
  isSelected?: boolean
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ active, isSelected = false, title, ...props }, ref) => {
    return (
      <button
        disabled={isSelected}
        className="group relative z-10 flex w-full items-center
        justify-center px-3 py-1.5 disabled:pointer-events-none"
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            `text-xs font-semibold
            transition-colors duration-150 ease-linear group-hover:text-slate-500`,
            {
              'text-zinc-50': isSelected,
            },
          )}
        >
          {title}
        </span>
        {isSelected && (
          <motion.div
            layoutId="activeFilter"
            className={cn(
              `absolute bottom-0 left-0 right-0 -z-[1] h-7 rounded-sm bg-slate-200
              transition-colors delay-700 ease-linear`,
              {
                'bg-slate-200': active === 'todos',
                'bg-blue-700': active === 'ativa',
                'bg-brand-red': active === 'inativa',
                'bg-brand-pink': active === 'sem-geracao',
                'bg-amber-400': active === 'offline',
              },
            )}
          />
        )}
      </button>
    )
  },
)
MenuItem.displayName = 'MenuItem'

export { MenuItem }
