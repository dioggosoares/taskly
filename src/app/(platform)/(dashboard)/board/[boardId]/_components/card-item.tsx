'use client'

import { Card } from '@prisma/client'
import { Draggable } from '@hello-pangea/dnd'
import { useModal } from '@/hooks/useModal'

interface CardItemProps {
  data: Card
  index: number
}

export function CardItem({ data, index }: CardItemProps) {
  const cardModal = useModal()

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate rounded-md border-2 border-transparent bg-white px-3
          py-2 text-sm shadow-sm transition-colors duration-150
          ease-linear hover:border-neutral-300"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  )
}
