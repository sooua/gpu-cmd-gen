import { defineConfig } from 'astro/config';

// Static output - no adapter needed for Vercel static deployment
export default defineConfig({
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
