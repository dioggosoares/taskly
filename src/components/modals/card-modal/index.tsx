'use client'

import { useQuery } from '@tanstack/react-query'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModal'
import { CardWithList } from '@/@types'
import { fetcher } from '@/lib/fetcher'

import { Header } from './header'
import { Description } from './description'
import { Actions } from './actions'

export function CardModal() {
  const { id, isOpen, onClose } = useModal((store) => {
    return {
      id: store.id,
      isOpen: store.isOpen,
      onClose: store.onClose,
    }
  })

  const { data: cardData, isLoading } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData || isLoading ? (
          <Header.Skeleton />
        ) : (
          <Header data={cardData} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
