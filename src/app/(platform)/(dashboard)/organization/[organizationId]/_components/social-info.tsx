'use client'

import { Board } from '@prisma/client'
import { Globe, Lock, Star } from 'lucide-react'

interface SocialInfoProps {
  board: Board
}

export function SocialInfo({ board }: SocialInfoProps) {
  return (
    <div className="z-50 flex items-center justify-between">
      {!board.public ? (
        <div className="flex items-center gap-x-2">
          <Lock className="h-3 w-3 text-neutral-50" />
          <span className="text-xs text-neutral-50">Privado</span>
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <Globe className="h-3 w-3 text-neutral-50" />
          <span className="text-xs text-neutral-50">Público</span>
        </div>
      )}

      <button className="group">
        <Star
          className="h-4 w-4 text-neutral-50 transition-opacity
          group-hover:opacity-75"
          // fill="#fafafa"
        />
      </button>
    </div>
  )
}
