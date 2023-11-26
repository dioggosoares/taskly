import { z } from 'zod'
import { Board } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-action'

import { UpdateCover } from './schema'

export type InputType = z.infer<typeof UpdateCover>
export type ReturnType = ActionState<InputType, Board>
