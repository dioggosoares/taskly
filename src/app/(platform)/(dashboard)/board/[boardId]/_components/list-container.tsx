'use client'

import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import { ListWithCards } from '@/@types'
import { ListForm } from './list-form'
import { ListItem } from './list-item'
import { reorder } from '@/helpers/reorder'
import { useAction } from '@/hooks/useAction'
import { updateListOrder } from '@/actions/update-list-order'
import { updateCardOrder } from '@/actions/update-list-card'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

export function ListContainer({ data, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success(`Lista reordenada!`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success(`Cartão reordenado!`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  function onDragEnd(result: any) {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // User moves a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      )

      setOrderedData(items)
      executeUpdateListOrder({ items, boardId })
    }

    // User moves a card
    if (type === 'card') {
      const newOrderedData = [...orderedData]

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      )
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      )

      if (!sourceList || !destList) {
        return
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = []
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        )

        reorderedCards.forEach((card, idx) => {
          card.order = idx
        })

        sourceList.cards = reorderedCards

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({
          boardId,
          items: reorderedCards,
        })
        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, idx) => {
          card.order = idx
        })

        // Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx
        })

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({
          boardId,
          items: destList.cards,
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
