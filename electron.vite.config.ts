import { resolve } from 'path'
import {
  bytecodePlugin,
  defineConfig,
  ElectronViteConfig,
  externalizeDepsPlugin,
  loadEnv
  // bytecodePlugin
} from 'electron-vite'
// 渲染端插件
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'
import fs from 'fs'

export default defineConfig(({ command, mode }): ElectronViteConfig => {
  const envDir = './src/env'
  const env = loadEnv(mode, envDir)
  console.log(env, mode)
  const config: any & ElectronViteConfig = {
    main: {
      plugins: [],
      envDir,
      resolve: {
        alias: {
          '@': resolve('./src'),
          '@main': resolve(__dirname, './src/main')
        }
      },
      esbuild: {
        drop: ['debugger']
      },
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'src/main/index.ts'),
            'utlis/index': resolve(__dirname, 'src/utils/index.ts'),
            // 'childProcess/child': resolve(__dirname, 'src/main/childProcess/child.ts'),
            ...getChildProcessEntries()
          }
        }
      }
    },
    preload: {
      envDir,
      plugins: []
    },
    renderer: {
      envDir,
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src'),
          '@': resolve('./src')
        }
      },

      plugins: [vue(), UnoCSS()]
    }
  }
  const a1 = ['main', 'preload']
  const a2 = ['main', 'preload', 'renderer']
  if (command === 'build') {
    a1.forEach(function (key) {
      config[key].plugins.push(bytecodePlugin(), externalizeDepsPlugin())
    })

    a2.forEach(function (key) {
      if (config[key].build) {
        config[key].build.minify = true
      } else {
        config[key].build = {
          minify: true
        }
      }
    })
  } else if (command === 'serve') {
    a2.forEach(function (key) {
      if (config[key].build) {
        config[key].build.sourcemap = true
      } else {
        config[key].build = {
          sourcemap: true
        }
      }
    })
  }
  console.log(config)

  return config
})

function getChildProcessEntries() {
  const extraFiles = globSync(`${resolve(__dirname, 'src/main/childProcess/')}`)
  const entries = {}
  for (const p of extraFiles) {
    const entryName = `childProcess/${path.basename(p).replace(/\.ts/, '')}`
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
