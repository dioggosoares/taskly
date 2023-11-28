import { ElementRef, useRef, useState } from 'react'
import { Layout } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

import { CardWithList } from '@/@types'
import { useAction } from '@/hooks/useAction'
import { updateCard } from '@/actions/update-card'
import { FormInput } from '@/components/form/form-input'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

interface HeaderProps {
  data: CardWithList
}

export function Header({ data }: HeaderProps) {
  const queryClient = useQueryClient()
  const params = useParams()

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })

      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })

      toast.success(`Renomeado para "${data.title}"`)
      setTitle(data.title)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(data.title)

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = params.boardId as string

    if (title === data.title) return

    execute({ title, boardId, id: data.id })
  }

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-2 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="text-neutral relative -left-1.5 mb-0.5 w-[95%] truncate
            border-transparent bg-transparent px-1 text-xl font-semibold
            focus-visible:border-input focus-visible:bg-white"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          na lista <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-6 w-12 bg-neutral-200" />
      </div>
    </div>
  )
}
