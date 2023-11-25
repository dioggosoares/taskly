import { z } from 'zod'

export const CreateList = z.object({
  title: z
    .string({
      required_error: 'O título é obrigatório',
      invalid_type_error: 'O título é obrigatório',
    })
    .min(3, {
      message: 'O título é muito curto',
    }),
  boardId: z.string(),
})
