import { drizzle } from 'drizzle-orm/d1';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';

/**
 * Better Auth Instance Factory
 */
export const createAuth = (env: CloudflareBindings): ReturnType<typeof betterAuth> => {
  const db = drizzle(env.DB);

  return betterAuth({
    database: drizzleAdapter(db, { provider: 'sqlite' }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
        google: { 
            clientId: env.GOOGLE_CLIENT_ID, 
            clientSecret: env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
  });
};

/**
 * Auth instance for CLI tools (using environment variables)
 */
export const auth = betterAuth({
  database: drizzleAdapter(drizzle(process.env.DB as any), { provider: 'sqlite' }),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:8787',
  secret: process.env.BETTER_AUTH_SECRET || 'dev-secret',
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID || '', 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '', 
    }, 
  },
});