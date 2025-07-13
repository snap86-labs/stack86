import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});