import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/lib/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});