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
}

export function Hint({
  children,
  description,
  side = 'bottom',
  sideOffset = 0,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
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
