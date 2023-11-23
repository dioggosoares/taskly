'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'
import { createSafeAction } from '@/lib/create-safe-action'

async function handler(data: InputType): Promise<ReturnType> {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Não Autorizado',
    }
  }

  const { title } = data

  let board

  try {
    board = await db.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'Falha ao criar o quadro',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
