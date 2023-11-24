import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().url(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().url(),
  NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: z.string().url(),
  NEXT_PUBLIC_UNSPLASH_SECRET_KEY: z.string().url(),
  CLERK_SECRET_KEY: z.string().url(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables.',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data
