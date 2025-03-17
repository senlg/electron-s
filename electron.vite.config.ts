import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
// 渲染端插件
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    envDir: './env',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts'),
          utlis: resolve(__dirname, 'src/utils/index.ts')
        },

        output: {
          preserveModules: true,
          preserveModulesRoot: 'src/main'
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue(), UnoCSS()]
  }
})
