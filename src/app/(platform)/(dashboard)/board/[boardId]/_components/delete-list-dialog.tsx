import { ElementRef, ReactNode, useRef, useState } from 'react'
import { List } from '@prisma/client'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAction } from '@/hooks/useAction'
import { deleteList } from '@/actions/delete-list'
import { Button } from '@/components//ui/button'
import { FormSubmit } from '@/components/form/form-submit'

interface DeleteListDialogProps {
  data: List
  children: ReactNode
}

export function DeleteListDialog({ children, data }: DeleteListDialogProps) {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const [open, setOpen] = useState(false)
  const { execute } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`Lista "${data.title}" deletada`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    execute({ id, boardId })
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex min-h-[10rem] w-auto flex-col gap-6 xl:max-w-lg">
        <DialogHeader>
          <DialogTitle>Deletar Lista</DialogTitle>
        </DialogHeader>
        <form action={onDelete} className="space-y-9">
          <h3 className="space-y-9">
            Essa ação é irreversível. Deseja mesmo deletar essa lista?
          </h3>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
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
