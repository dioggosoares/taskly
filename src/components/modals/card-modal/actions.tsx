import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { Copy, Loader2, Trash } from 'lucide-react'

import { CardWithList } from '@/@types'
import { useAction } from '@/hooks/useAction'
import { useModal } from '@/hooks/useModal'
import { copyCard } from '@/actions/copy-card'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { deleteCard } from '@/actions/delete-card'

interface ActionsProps {
  data: CardWithList
}

export function Actions({ data }: ActionsProps) {
  const params = useParams()
  const cardModal = useModal()

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: () => {
        toast.success(`Cartão "${data.title}" copiado!`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    },
  )

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: () => {
        toast.success(`Cartão "${data.title}" deletado!`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    },
  )

  const onCopy = () => {
    const boardId = params.boardId as string

    executeCopyCard({
      id: data.id,
      boardId,
    })
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    executeDeleteCard({
      id: data.id,
      boardId,
    })
  }

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>

      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        size="inline"
        className="w-full justify-start"
      >
        <Copy className="mr-2 h-4 w-4" />
        {isLoadingCopy ? (
          <Loader2 className="h-5 w-5 animate-spin text-neutral-800" />
        ) : (
          'Copiar'
        )}
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="destructive"
        size="inline"
        className="w-full justify-start"
      >
        <Trash className="mr-2 h-4 w-4" />
        {isLoadingDelete ? (
          <Loader2 className="h-5 w-5 animate-spin text-zinc-50" />
        ) : (
          'Deletar'
        )}
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  )
}
