import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import VueRouter from 'unplugin-vue-router/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Vue Router plugin for handling routes
    VueRouter({
      /* Add specific options here if needed */
    }),
    // Vue plugin for single-file components
    vue(),
    // Vue JSX plugin for JSX/TSX support
    vueJsx(),
    // Vue DevTools plugin for debugging
    vueDevTools(),
  ],
  resolve: {
    alias: {
      // Alias '@' to the 'src' directory for cleaner imports
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\api/, '/api'),
      },
    },
  },
});
