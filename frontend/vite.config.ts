import { defineConfig } from 'vite';
import dns from 'dns';
import eslint from 'vite-plugin-eslint';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [eslint()],
  server: {
    host: 'localhost',
    port: 3000,
  },
});
