// users.ts
import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { user } from '../lib/schema'
import { AppContext } from '../lib/hono-types'

const users = new Hono<AppContext>()
.get('/', async (c) => {
  const db = drizzle(c.env.DB)
  const users = await db.select().from(user)
  return c.json(users)
})

export default users
