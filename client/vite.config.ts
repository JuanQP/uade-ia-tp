import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
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
          target: env.BACKEND_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
