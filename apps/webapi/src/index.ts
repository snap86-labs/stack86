import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/users', async (c) => {
  const db = drizzle(c.env.DB)
})
export default app
