'use client'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { KanbanSquare, List } from 'lucide-react'

interface BoardViewMenuProps {
  defaultListValue?: string
  onChangeViewType?: () => void
}

export function BoardViewMenu({
  onChangeViewType,
  defaultListValue = 'grid',
}: BoardViewMenuProps) {
  return (
    <ToggleGroup.Root
      className="flex items-center gap-2"
      type="single"
      defaultValue={defaultListValue}
      aria-label="Grid view"
    >
      <ToggleGroup.Item
        className="group flex h-9 w-9 items-center justify-center rounded-md bg-secondary
              text-sm font-medium text-secondary-foreground shadow-sm
              transition-colors duration-150 ease-linear hover:bg-purple-600 hover:bg-secondary/80
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary
              disabled:pointer-events-none disabled:opacity-50 data-[state=on]:pointer-events-none
              data-[state=on]:bg-purple-600 data-[state=on]:text-zinc-50"
        value="grid"
        aria-label="Grid view"
        onClick={onChangeViewType}
      >
        <KanbanSquare className="text-purple-600 group-hover:text-zinc-50 group-data-[state=on]:text-zinc-50" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="group flex h-9 w-9 items-center justify-center rounded-md bg-secondary
              text-sm font-medium text-secondary-foreground shadow-sm
              transition-colors duration-150 ease-linear hover:bg-purple-600 hover:bg-secondary/80
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary
              disabled:pointer-events-none disabled:opacity-50 data-[state=on]:pointer-events-none
              data-[state=on]:bg-purple-600 data-[state=on]:text-zinc-50"
        value="list"
        aria-label="List view"
        onClick={onChangeViewType}
      >
        <List
          className="text-purple-600 group-hover:text-zinc-50 group-data-[state=on]:text-zinc-50"
          strokeWidth={2}
        />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
