import { HelpCircle, User2 } from 'lucide-react'

import { Hint } from '@/components/hint'
import { FormPopover } from '@/components/form/form-popover'

export function BoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="h6 mr-2 w-6" />
        Seus quadros
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative flex aspect-video h-full w-full flex-col items-center
            justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
          >
            <p className="text-sm text-zinc-500">Criar novo quadro</p>
            <span className="text-xs">5 restantes</span>
            <Hint
              sideOffset={45}
              description={`
            Os Workspaces gratuitos podem ter até 5 quadros. Para quadros ilimitados, faça um upgrade deste Workspace.
          `}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[.875rem] w-[.875rem]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}
