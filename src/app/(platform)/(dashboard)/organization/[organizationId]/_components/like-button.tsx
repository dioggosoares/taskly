'use client'

import { Star } from 'lucide-react'

export function LikeButton() {
  return (
    <div className="z-50 flex items-center justify-end">
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
