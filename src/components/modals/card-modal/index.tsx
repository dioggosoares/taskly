import { useQuery } from '@tanstack/react-query'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModal'
import { CardWithList } from '@/@types'
import { fetcher } from '@/lib/fetcher'

import { Header } from './header'

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
      </DialogContent>
    </Dialog>
  )
}
