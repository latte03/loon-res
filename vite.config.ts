import { defineConfig } from 'vite'
import ConditionalCompile from 'vite-plugin-conditional-compiler'
import { inlineImports } from 'vite-plugin-inline-imports'

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
  plugins: [
    ConditionalCompile(),
    inlineImports({
      rules: [
        {
          for: [/src\/script\//],
          inline: [/src\/utils\//]
        }
      ]
    })
  ],
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

//  `
//     打包后的目录如下：

//     ```
//     script
//         - notification-BSSeMskR.js
//         - oil.js
//         - qq-music-hot.js
//     ```

// 其中 oil.js 和 qq-music-hot.js 都有以下模块的引入
//     ```
// import { n as f } from "./notification-BSSeMskR.js";

// ```
// 我希望直接讲模块在oil.js和qq-music-hot.js中直接写入而不是引入，
// 最终的打包产出只有 oil.js和qq-music-hot.js
// `
