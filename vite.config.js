import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // send /api calls to the express server
    proxy: { '/api': 'http://localhost:3000' },
  },
})
