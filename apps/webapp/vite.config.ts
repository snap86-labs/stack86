import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }), react(), tailwindcss()],
    build: {
      outDir: resolve(__dirname, '../webapi/.dist'),
      emptyOutDir: true
    },
    server: {
      proxy: {
        '/api': process.env.VITE_DEV_API_URL as string,
      }
    }
  }
  )
}
