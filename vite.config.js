// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => {
  return {
    plugins: [tailwindcss()],
    base: command === 'build' ? '/sillyWeatherApp/' : '/',
  };
});
