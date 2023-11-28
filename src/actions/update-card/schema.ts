import { FEEDBACK_MESSAGES } from '@/constants/general'
import { z } from 'zod'

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: FEEDBACK_MESSAGES.DESCRIPTION_REQUIRED,
        invalid_type_error: FEEDBACK_MESSAGES.DESCRIPTION_REQUIRED,
      })
      .min(3, {
        message: FEEDBACK_MESSAGES.DESCRIPTION_SHORT,
      }),
  ),
  title: z.optional(
    z
      .string({
        required_error: FEEDBACK_MESSAGES.TITLE_REQUIRED,
        invalid_type_error: FEEDBACK_MESSAGES.TITLE_REQUIRED,
      })
      .min(3, {
        message: FEEDBACK_MESSAGES.TITLE_SHORT,
      }),
  ),
  id: z.string(),
})
