import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      /* options */
    })
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['cjs'],
      name: 'index.js'
    },
    minify: false
  }
})
