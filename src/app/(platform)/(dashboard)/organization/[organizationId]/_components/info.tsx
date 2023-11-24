'use client'

import Image from 'next/image'
import { CreditCard } from 'lucide-react'
import { useOrganization } from '@clerk/nextjs'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface InfoProps {
  isPro: boolean
}

export function Info({ isPro }: InfoProps) {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <Info.Skeleton />
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[3.75rem] w-[3.75rem]">
        <Image
          fill
          src={organization!.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 h-3 w-3" />
          <div
            className={cn('rounded-sm bg-purple-100 px-2 py-0.5', {
              'bg-pink-100': isPro,
            })}
          >
            <span
              className={cn('font-semibold text-purple-700', {
                'text-pink-600': isPro,
              })}
            >
              {isPro ? 'Pro' : 'Free'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[3.75rem] w-[3.75rem]">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[12.5rem]" />
        <div className="flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-[6.25rem]" />
        </div>
      </div>
    </div>
  )
}
