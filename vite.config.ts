import { defineConfig } from 'vite'
import ConditionalCompile from 'vite-plugin-conditional-compiler'
import fs from 'node:fs'
import path from 'node:path'
const modulesDir = './src/script'
const moduleNames = fs.readdirSync(modulesDir)

const entries = moduleNames
  .filter((moduleName) => fs.lstatSync(path.join(modulesDir, moduleName)).isDirectory())
  .reduce((entry, moduleName) => {
    const entryFile = path.join(modulesDir, moduleName, 'index.ts')
    entry[moduleName] = entryFile
    return entry
  }, {})
export default defineConfig({
  plugins: [ConditionalCompile()],
  build: {
    outDir: 'script',
    target: 'esnext',
    lib: {
      entry: entries,
      formats: ['es'],
      name: 'index'
    },
    minify: true
  },
  server: {
    port: 3699
  }
})
