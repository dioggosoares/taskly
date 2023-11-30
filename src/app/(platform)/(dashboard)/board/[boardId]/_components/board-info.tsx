'use client'

import { useOrganization } from '@clerk/nextjs'
import { Board } from '@prisma/client'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'
import { BoardTitleForm } from './board-title-form'
import { Globe, Lock } from 'lucide-react'

interface BoardInfoProps {
  board: Board
}

export function BoardInfo({ board }: BoardInfoProps) {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <BoardInfo.Skeleton />
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

      <BoardTitleForm board={board} />

      {board.public ? (
        <Globe className="mt-1.5 h-4 w-5 text-neutral-50" />
      ) : (
        <Lock className="mt-1.5 h-4 w-5 text-neutral-50" />
      )}
    </div>
  )
}

BoardInfo.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative h-[4.5rem] w-[4.5rem]">
        <Skeleton className="absolute h-[4.5rem] w-[4.5rem] rounded-full" />
      </div>

      <Skeleton className="h-12 w-96" />
    </div>
  )
}
