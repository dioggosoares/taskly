'use client'

import { useQuery } from '@tanstack/react-query'
import { AuditLog } from '@prisma/client'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModal'
import { CardWithList } from '@/@types'
import { fetcher } from '@/lib/fetcher'

import { Header } from './header'
import { Description } from './description'
import { Actions } from './actions'
import { Activity } from './activity'

export function CardModal() {
  const { id, isOpen, onClose } = useModal((store) => {
    return {
      id: store.id,
      isOpen: store.isOpen,
      onClose: store.onClose,
    }
  })

  const { data: cardData, isLoading: isLoadingHeader } = useQuery<CardWithList>(
    {
      queryKey: ['card', id],
      queryFn: () => fetcher(`/api/cards/${id}`),
    },
  )

  const { data: auditLogsData, isLoading: isLoadingLogs } = useQuery<
    AuditLog[]
  >({
    queryKey: ['card-logs', id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData || isLoadingHeader ? (
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
              {!auditLogsData || isLoadingLogs ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
