import { env } from '../env'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { user, wordSearches } from './schema/schema'

const client = createClient({ url: env.DB_FILE_NAME })
const db = drizzle(client, {
  schema: {
    user,
    wordSearches
  }
})

export { db }