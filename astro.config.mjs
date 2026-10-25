// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://heiyoaerry.one',
  // Old URLs (/about, /projects) stay as directories: /about/index.html
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
