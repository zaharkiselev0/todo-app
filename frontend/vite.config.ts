import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, '../td/static'),
    emptyOutDir: true,
    assetsDir: 'assets',
    manifest: true,
    sourcemap: true,
  },
  base: '/static/',
})
