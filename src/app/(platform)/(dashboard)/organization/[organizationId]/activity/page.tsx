import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'
import { Info } from '../_components/info'
import { ActivityList } from './_components/activity-list'

export default function Activity() {
  return (
    <div className="w-full">
      <Info isPro={false} />

      <Separator className="my-2" />

      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}
