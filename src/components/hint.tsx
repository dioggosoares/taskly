import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface HintProps {
  children: ReactNode
  description: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  sideOffset?: number
  asChild?: boolean
}

export function Hint({
  children,
  description,
  side = 'bottom',
  sideOffset = 0,
  asChild,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className="max-w-[13.75rem] break-words text-xs"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
