import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    svgr(),
    react(),
  ],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.Frontend_Port),
    watch: {
      usePolling: true,
      interval: 1000,
    }
  }
})