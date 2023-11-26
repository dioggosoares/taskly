import { z } from 'zod'

export const UpdateCover = z.object({
  id: z.string(),
  image: z.string({
    required_error: 'A capa é obrigatória',
    invalid_type_error: 'A capa é obrigatória',
  }),
})
