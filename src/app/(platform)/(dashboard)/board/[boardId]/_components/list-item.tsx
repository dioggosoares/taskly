'use client'

import { ListWithCards } from '@/@types'
import { ListHeader } from './list-header'

interface ListItemProps {
  data: ListWithCards
  index: number
}

export function ListItem({ data, index }: ListItemProps) {
  return (
    <li className="h-full w-[17rem] shrink-0 select-none">
      <div className="w-full rounded-md bg-neutral-100 pb-2 shadow-md">
        <ListHeader data={data} />
      </div>
    </li>
  )
}
