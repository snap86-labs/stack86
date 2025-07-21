// lib/hono-types.ts
import type { betterAuth } from 'better-auth'

export type AuthInstance = ReturnType<typeof betterAuth>

export type AppContext = {
  Bindings: CloudflareBindings
  Variables: {
    user: AuthInstance['$Infer']['Session']['user'] | null
    session: AuthInstance['$Infer']['Session']['session'] | null
  }
}

