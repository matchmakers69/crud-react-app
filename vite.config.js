import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/api'),
      '@features': path.resolve(__dirname, './src/features'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@test': path.resolve(__dirname, './src/test'),
    },
  },
})
