import { ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { useAction } from '@/hooks/useAction'
import { deleteBoard } from '@/actions/delete-board'
import { toast } from 'sonner'
import { FormSubmit } from './form/form-submit'

interface DialogDeleteBoardProps {
  id: string
  children: ReactNode
}

export function DialogDeleteBoard({ id, children }: DialogDeleteBoardProps) {
  const [open, setOpen] = useState(false)
  const { execute } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    },
  })

  function onDelete() {
    execute({ id })
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex min-h-[10rem] w-auto flex-col gap-6 xl:max-w-lg">
        <DialogHeader>
          <DialogTitle>Deletar Quadro</DialogTitle>
        </DialogHeader>
        <form action={onDelete} className="space-y-9">
          <h3 className="space-y-9">
            Essa ação é irreversível. Deseja mesmo deletar esse quadro?
          </h3>
          <div className="flex w-full justify-end">
            <div className="flex w-max gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setOpen(!open)}
              >
                Cancelar
              </Button>
              <FormSubmit
                variant="destructive"
                className="w-full min-w-[4.5rem]"
              >
                Deletar
              </FormSubmit>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
