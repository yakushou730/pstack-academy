import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  esbuild: { jsx: 'automatic' },
  build: { rollupOptions: { output: { manualChunks(id) {
    if (id.includes('/node_modules/')) return 'vendor';
    if (id.endsWith('/content/generated.json')) return 'curriculum';
  } } } },
  server: { host: '127.0.0.1', strictPort: true },
  test: { environment: 'node', include: ['tests/**/*.test.{ts,tsx}'] },
});
