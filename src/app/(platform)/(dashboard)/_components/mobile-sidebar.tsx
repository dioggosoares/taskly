'use client'

import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useMobileSidebar } from '@/hooks/useMobileSidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'
import { STORAGE_KEYS } from '@/constants/general'

export function MobileSidebar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

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
        className="mr-3 flex md:hidden"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-12">
          <Sidebar
            storageKey={STORAGE_KEYS.EXPANDED_ACCORDION_MOBILE_SIDEBAR}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
