'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
// import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion } from '@/components/ui/accordion'
import { NavItem, Organization } from './nav-item'
import { STORAGE_KEYS } from '@/constants/general'
import { FormPopover } from '@/components/form/form-popover'

interface SidebarProps {
  storageKey?: string
}

export function Sidebar({
  storageKey = STORAGE_KEYS.EXPANDED_ACCORDION_SIDEBAR,
}: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  )

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization()
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }

      return acc
    },
    [],
  )

  function onExpand(id: string) {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-1 flex flex-col gap-2">
        <FormPopover sideOffset={18}>
          <Button
            size="sm"
            variant="primary"
            className="flex h-auto w-full gap-2 rounded-sm px-2 py-1.5 md:hidden"
          >
            <Plus className="h-4 w-4" />
            Criar Quadro
          </Button>
        </FormPopover>
        <div className="mb-1 flex items-center text-xs font-medium">
          <span className="pl-4 font-semibold">Workspaces</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-auto"
            asChild
          >
            <Link href="/select-org">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => {
          return (
            <NavItem
              key={organization.id}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expanded[organization.id]}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          )
        })}
      </Accordion>
    </>
  )
}
