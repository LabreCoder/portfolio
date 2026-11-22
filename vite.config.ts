import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  // No GitHub Pages de projeto o site fica em /<repo>/. O workflow de deploy passa esse caminho em BASE_PATH
  // (vazio para <usuario>.github.io ou domínio próprio); localmente o padrão é a raiz.
  base: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : '/',
  plugins: [react(), tailwindcss()],
  // O código roda no Docker sobre uma pasta do Windows, que não avisa mudanças: o servidor confere por polling.
  server: { watch: { usePolling: true, interval: 300 } },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
