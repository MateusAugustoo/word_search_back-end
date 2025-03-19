import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  username: text('username').unique().notNull()
})

export const wordSearches = sqliteTable('word_searches', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull(),
  title: text('title').notNull(),
  words: text('words', { mode: 'json' }).notNull(),
  difficulty: text('difficulty').notNull(),
  createAt: integer('create_at').default(Date.now())
})