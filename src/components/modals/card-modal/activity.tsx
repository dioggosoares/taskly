import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { ActivityItem } from '@/components/activity-item'
import { cn } from '@/lib/utils'

interface ActivityProps {
  items: AuditLog[]
}

export function Activity({ items }: ActivityProps) {
  return (
    <div className="flex w-full items-start gap-x-3">
      <ActivityIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Atividade</p>
        <p
          className={cn(
            'hidden text-left text-xs text-muted-foreground',
            items.length === 0 && 'block',
          )}
        >
          Nenhuma atividade encontrada neste cartão
        </p>
        <ol className="mt-2 max-h-[10rem] space-y-4 overflow-y-auto">
          {items.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  )
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-10 w-full bg-neutral-200" />
      </div>
    </div>
  )
}
