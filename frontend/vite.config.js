import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:8000', // โยนไปหาคอนเทนเนอร์ชื่อ backend
        changeOrigin: true,
      },
      '/Tarot_Card': {
        target: 'http://backend:8000', // โยนไปหาคอนเทนเนอร์ชื่อ backend
        changeOrigin: true,
      }
    }
  }
})