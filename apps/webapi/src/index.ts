import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { createAuth } from './lib/auth'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  const auth = createAuth(c.env);
	return auth.handler(c.req.raw);
});

export default app
