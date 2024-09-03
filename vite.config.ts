import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/src',                 // Output directory for Vite build
    rollupOptions: {
      input: 'index.html',              // Entry point
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
