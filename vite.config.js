import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/OoA-Stream-Slideshow/',
  server: {
    proxy: {
      '/api': {
        target: 'https://character-service.dndbeyond.com', // Target external API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/character/v3/character') // Rewrite the URL path
      },
    }
  },
  plugins: [react()],
})
