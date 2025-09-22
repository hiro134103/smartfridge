import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/foods': 'http://localhost:8000',   // バックエンドAPI
      '/predict': 'http://localhost:8001', // AIサーバーAPI
    }
  }
})
