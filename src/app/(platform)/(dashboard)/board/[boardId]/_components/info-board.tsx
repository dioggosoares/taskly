import { useUser, useOrganization } from '@clerk/nextjs'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

export function InfoBoard() {
  const { user } = useUser()
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <InfoBoard.Skeleton />
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 pt-6">
      <figure className="relative h-[4.5rem] w-[4.5rem]">
        <Image
          fill
          src={organization!.imageUrl}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </figure>

      <h1 className="text-xl font-semibold">{organization?.name}</h1>

      <span className="text-sm text-neutral-400">
        {user?.primaryEmailAddress?.emailAddress}
      </span>

      <span className="font-semibold text-purple-600">@{user?.firstName}</span>
    </div>
  )
}

InfoBoard.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex w-full flex-col items-center gap-3 p-6">
      <div className="relative h-[3.75rem] w-[3.75rem]">
        <Skeleton className="absolute h-[3.75rem] w-[3.75rem] rounded-full" />
      </div>

      <Skeleton className="h-7 w-44" />
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-7 w-32" />
    </div>
  )
}
