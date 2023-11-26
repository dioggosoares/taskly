import { z } from 'zod'

import { FEEDBACK_MESSAGES } from '@/constants/general'

export const CreateCard = z.object({
  title: z
    .string({
      required_error: FEEDBACK_MESSAGES.TITLE_REQUIRED,
      invalid_type_error: FEEDBACK_MESSAGES.TITLE_REQUIRED,
    })
    .min(3, {
      message: FEEDBACK_MESSAGES.TITLE_SHORT,
    }),
  boardId: z.string(),
  listId: z.string(),
})
