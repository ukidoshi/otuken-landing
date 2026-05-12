import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const apiTarget = process.env.VITE_DEV_API_PROXY || 'http://localhost:8081'

const proxy = {
  '/api': { target: apiTarget, changeOrigin: true },
  '/sanctum': { target: apiTarget, changeOrigin: true },
  '/storage': { target: apiTarget, changeOrigin: true }
}

export default defineConfig({
  plugins: [vue()],
  server: { proxy },
  // npm run preview — иначе /api уходит на порт preview без Laravel
  preview: { proxy }
})
