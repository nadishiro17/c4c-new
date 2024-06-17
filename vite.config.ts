import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  server: {
    port: 3000,
  },
  publicDir: 'frontend/public',
  resolve: {
    alias: {
      '@': '/frontend/src', // Ensure this points to the correct directory
    },
  },
});
