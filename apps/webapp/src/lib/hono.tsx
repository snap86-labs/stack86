import app from '@stack86/webapi/index'
import { hc } from 'hono/client'

export const honoClient = hc<typeof app>('/api')