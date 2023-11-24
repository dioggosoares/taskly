'use client'

import { useOrganization } from '@clerk/nextjs'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

export function OrgInfo() {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <OrgInfo.Skeleton />
  }

  return (
    <div className="flex w-full items-center gap-3">
      <figure className="relative h-[4.5rem] w-[4.5rem]">
        <Image
          fill
          src={organization!.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </figure>

      <h1 className="text-4xl font-semibold text-zinc-50">
        {organization?.name}
      </h1>
    </div>
  )
}

OrgInfo.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative h-[3.75rem] w-[3.75rem]">
        <Skeleton className="absolute h-[3.75rem] w-[3.75rem] rounded-full" />
      </div>

      <Skeleton className="h-7 w-64" />
    </div>
  )
}
