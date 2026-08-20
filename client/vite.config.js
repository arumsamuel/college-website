import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// API proxy to Express backend during development
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:4010',
      '/assets': 'http://localhost:4010'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
