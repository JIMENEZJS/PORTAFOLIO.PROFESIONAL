import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: ['index.html', 'privacidad.html', 'terminos.html'].map((p) => resolve(import.meta.dirname, p)),
    },
  },
});
