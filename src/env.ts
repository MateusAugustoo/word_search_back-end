import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  FIREBASE_ADMIN: z.string()
})

export const env = envSchema.parse(process.env)