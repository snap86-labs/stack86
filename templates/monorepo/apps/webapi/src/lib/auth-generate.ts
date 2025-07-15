import { drizzle } from 'drizzle-orm/d1';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
    database: drizzleAdapter(drizzle(process.env.DB as any), { provider: 'sqlite' }),
    baseURL: '',
    secret: '',
    socialProviders: {
        google: {
            clientId: '',
            clientSecret: '',
        }
    }
});