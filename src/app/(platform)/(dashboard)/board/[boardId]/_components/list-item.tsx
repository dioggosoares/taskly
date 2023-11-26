'use client'

import { ElementRef, useRef, useState } from 'react'

import { ListWithCards } from '@/@types'
import { ListHeader } from './list-header'
import { CardForm } from './card-form'

interface ListItemProps {
  data: ListWithCards
  index: number
}

export function ListItem({ data, index }: ListItemProps) {
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
      textareaRef.current?.select()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  return (
    <li className="h-full w-[17rem] shrink-0 select-none">
      <div className="w-full rounded-md bg-neutral-100 pb-2 shadow-md">
        <ListHeader data={data} onAddCard={enableEditing} />

        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  )
}
