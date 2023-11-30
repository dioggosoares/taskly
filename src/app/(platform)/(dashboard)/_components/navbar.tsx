import { OrganizationSwitcher, UserButton, auth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from './mobile-sidebar'
import { FormPopover } from '@/components/form/form-popover'
import { notFound, redirect } from 'next/navigation'
import { db } from '@/lib/db'

export async function NavBar() {
  const { orgId } = auth()

  if (!orgId) return redirect('/select-org')

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!boards) notFound()

  return (
    <nav
      className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white
      px-4 shadow-sm"
    >
      <MobileSidebar data={boards} />
      <div className="flex items-center gap-x-4">
        <div className="hidden lg:flex">
          <Logo />
        </div>
        <div className="rounded-sm bg-pink-100 px-2 pb-[.1875rem]">
          <span className="text-xs font-semibold text-pink-600">Beta</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-4">
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            variant="primary"
            className="hidden h-auto gap-2 rounded-sm px-2 py-1.5 md:flex"
          >
            <Plus className="h-4 w-4" />
            <span className="font-semibold">Criar quadro</span>
          </Button>
        </FormPopover>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  )
}
