import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const usePolling = process.env.CHOKIDAR_USEPOLLING === 'true'
const hmrClientPort = process.env.VITE_HMR_CLIENT_PORT
  ? Number(process.env.VITE_HMR_CLIENT_PORT)
  : undefined

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: usePolling ? { usePolling: true, interval: 300 } : undefined,
    hmr: hmrClientPort ? { clientPort: hmrClientPort } : undefined,
  },
})
