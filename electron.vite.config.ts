import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
// 渲染端插件
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'
import fs from 'fs'
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    envDir: './src/env',
    base: '.',
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@main': resolve(__dirname, './src/main')
      }
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts'),
          'utlis/index': resolve(__dirname, 'src/utils/index.ts'),
          // 'childProcess/child': resolve(__dirname, 'src/main/childProcess/child.ts'),
          ...getChildProcessEntries()
        },

        output: {
          preserveModules: true,
          preserveModulesRoot: 'src/main'
        }
      }
    }
  },
  preload: {
    envDir: './src/env',
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    envDir: './src/env',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('./src')
      }
    },
    plugins: [vue(), UnoCSS()]
  }
})

function getChildProcessEntries() {
  const extraFiles = globSync(`${resolve(__dirname, 'src/main/childProcess/')}`)
  const entries = {}
  for (const p of extraFiles) {
    const entryName = `childProcess/${path.basename(p).replace(/\.ts/, '')}`
    console.log(entryName)

    entries[entryName] = p
  }
  ;``
  return entries
}

function globSync(baseDir) {
  const extension = '.ts'
  const files: any[] = []

  function traverseDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        traverseDir(fullPath)
      } else if (path.extname(fullPath) === extension) {
        files.push(fullPath)
      }
    }
  }

  traverseDir(baseDir)
  return files
}
