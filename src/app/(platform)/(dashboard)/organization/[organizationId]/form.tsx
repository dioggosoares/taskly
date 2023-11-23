'use client'

import { createBoard } from '@/actions/create-board'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { useAction } from '@/hooks/useAction'

export function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'SUCCESS')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    console.log({ title })
    execute({ title })
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col space-y-2">
        <FormInput
          label="Título do Quadro"
          id="title"
          errors={fieldErrors}
          className="h-9"
        />
      </div>
      <FormSubmit>Salvar</FormSubmit>
    </form>
  )
}
