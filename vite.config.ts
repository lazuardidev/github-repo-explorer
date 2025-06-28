import { defineConfig, configDefaults } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
      exclude: [
        'src/main.tsx',
        'src/App.tsx',
        'src/config/**',
        'src/routes/**',
        'src/services/**',
      ],
    },
  },
});
