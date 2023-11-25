import { ReactNode } from 'react'

interface ListWrapperProps {
  children: ReactNode
}

export function ListWrapper({ children }: ListWrapperProps) {
  return <li className="h-full w-[17rem] shrink-0 select-none">{children}</li>
}
