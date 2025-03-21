import { db } from "../drizzle/client"
import { user } from "../drizzle/schema/schema"

interface UserProps {
  id: string
  name: string
  username: string
}

export const userFunctions = {
  async create({id, name, username}: UserProps) {
    await db.insert(user).values({
      id,
      name,
      username
    })

    return {
      id
    }
  }
}