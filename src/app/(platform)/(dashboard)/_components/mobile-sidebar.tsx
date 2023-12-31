'use client'

import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useMobileSidebar } from '@/hooks/useMobileSidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'
import { STORAGE_KEYS } from '@/constants/general'
import { BoardSidebar } from '../board/[boardId]/_components/board-sidebar'
import { Board } from '@prisma/client'

export function MobileSidebar({ data }: { data: Board[] }) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  const isBoardPage = pathname.startsWith('/board')

  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)
  const isOpen = useMobileSidebar((state) => state.isOpen)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={onOpen}
        className="mr-3 flex lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-12">
          {!isBoardPage ? (
            <Sidebar
              storageKey={STORAGE_KEYS.EXPANDED_ACCORDION_MOBILE_SIDEBAR}
            />
          ) : (
            <BoardSidebar data={data} />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
