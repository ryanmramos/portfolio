import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })],
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.BASE_PATH ?? ''
    }
  }
};

export default config;

