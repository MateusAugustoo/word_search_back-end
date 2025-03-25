import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  FIREBASE_ADMIN: z.string(),
  DB_FILE_NAME: z.string(),
  API_URL_LLAMA: z.string()
})

export const env = envSchema.parse(process.env)