import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    hmr: {
      overlay: false // Отключает надоедливый overlay при ошибках
    }
  },
  base: '/modern-2048/', // Имя вашего репозитория
  build: {
    target: 'esnext',
    rollupOptions: {
      // Обработка относительных путей для GitHub Pages
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) return 'assets/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
});