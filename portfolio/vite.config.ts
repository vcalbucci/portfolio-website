import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Since you have a custom domain (vcalbucci.com), use root path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
