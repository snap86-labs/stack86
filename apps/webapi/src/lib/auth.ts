import { drizzle } from 'drizzle-orm/d1';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import * as schema from './auth-schema';
import { oneTap, openAPI } from 'better-auth/plugins';

export const auth = (env: CloudflareBindings): ReturnType<typeof betterAuth> => {
  const db = drizzle(env.DB);

  return betterAuth({
    database: drizzleAdapter(db, { 
      provider: 'sqlite',
      schema: schema
    }),
    baseURL: env.MINIFLARE_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    trustedOrigins : [
      env.VITE_URL,
    ],
    plugins: [
      oneTap(),
      openAPI(), 
    ]
  });
};





