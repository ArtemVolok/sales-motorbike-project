import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    svgr(),
  ],
  server: {
    host: 'localhost',
    port: 3000,
  },
});
