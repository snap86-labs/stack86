import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),react(),tailwindcss(), tsconfigPaths()],
  build: {
    outDir: resolve(__dirname, '../webapi/dist'),
    emptyOutDir: true
  },
server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787', // Change to your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  }
)
