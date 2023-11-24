import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from './mobile-sidebar'
import { FormPopover } from '@/components/form/form-popover'

export function NavBar() {
  return (
    <nav
      className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white
      px-4 shadow-sm"
    >
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            variant="primary"
            className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
          >
            Criar Quadro
          </Button>
        </FormPopover>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
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
