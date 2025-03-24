import { defineConfig } from 'unocss'
//TODO 添加规则和预设

export default defineConfig({
  rules: [
    [
      /^test-(\d+)$/,
      (match) => {
        console.log(match)
        return { margin: `${Number(match[1])}px` }
      }
    ]
  ]
})
