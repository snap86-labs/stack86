// auth.ts
import { Hono } from 'hono'
import { auth } from '../lib/auth'
import { AppContext } from '../lib/hono-types'

const authRoutes = new Hono<AppContext>()
    .get('/', async (c) => {
        return auth(c.env).handler(c.req.raw)
    })
    .post('/', async (c) => {
        return auth(c.env).handler(c.req.raw)
    })

export default authRoutes
