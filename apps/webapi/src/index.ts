// index.ts
import { Hono } from 'hono'
import { auth } from './lib/auth'
import { cors } from 'hono/cors'
import type { betterAuth } from 'better-auth'
import users from './routes/users'
import authRoutes from './routes/auth'

type AuthInstance = ReturnType<typeof betterAuth>

const app = new Hono<{
  Bindings: CloudflareBindings
  Variables: {
    user: AuthInstance['$Infer']['Session']['user'] | null
    session: AuthInstance['$Infer']['Session']['session'] | null
  }
}>()
.use('*', async (c, next) => {
  const session = await auth(c.env).api.getSession({ headers: c.req.raw.headers })
  c.set('user', session?.user ?? null)
  c.set('session', session?.session ?? null)
  return next()
}).use('/auth/*', (c, next) =>
  cors({
    origin: c.env.VITE_URL,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })(c, next)
)
  .route('/users', users)
  .route('/auth', authRoutes) // Note: this is grouped under /auth


export type AppType = typeof app // ✅ Export for client
export default app
