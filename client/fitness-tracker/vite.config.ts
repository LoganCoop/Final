import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import VueRouter from 'unplugin-vue-router/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {      '/api': {
        target: 'https://fitness-tracker-shxf.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\api/, '/api'),
      },
    },
    fs: {
      strict: false,
    },
    hmr: {
      overlay: false,
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
    },
  },
});
