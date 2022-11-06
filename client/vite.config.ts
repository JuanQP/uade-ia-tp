import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src')},
      { find: '@features', replacement: path.resolve(__dirname, './src/features')},
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks')},
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages')},
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
