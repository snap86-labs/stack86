import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    outDir: resolve(__dirname, '../webapi/.dist'),
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
      }
    }
  }
)
