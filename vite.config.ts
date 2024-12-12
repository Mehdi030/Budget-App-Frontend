import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// CommonJS __dirname
const __dirname = path.resolve();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL des Backends
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Entferne Präfix '/api', falls nötig
      },
    },
  },
});
