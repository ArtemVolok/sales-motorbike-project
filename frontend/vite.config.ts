import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
  },
});
