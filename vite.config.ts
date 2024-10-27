import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import ConditionalCompile from 'vite-plugin-conditional-compiler'

export default defineConfig({
  plugins: [
    AutoImport({
      /* options */
    }),
    ConditionalCompile()
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      name: 'index',
      fileName: 'index'
    },
    minify: true
  }
})
