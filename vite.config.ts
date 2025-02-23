import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://localhost:7151',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //     },
  //   }
  // }
})
