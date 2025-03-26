import fs from 'fs'
import path from 'path'
// 验证目录是否存在
export const verifyExists = (path: string): boolean => {
  try {
    return fs.existsSync(path)
  } catch (error) {
    // 错误处理
    return false
  }
}

/**
 * 异步复制文件夹及其内容到目标目录
 * @param {string} source - 源文件夹路径
 * @param {string} target - 目标文件夹路径
 * @returns {Promise<void>}
 */
export async function copyFolder(source: string, target: string) {
  try {
    fs.mkdirSync(target, { recursive: true })
    const entries = fs.readdirSync(source, { withFileTypes: true })
    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name)
      const targetPath = path.join(target, entry.name)
      if (entry.isDirectory()) {
        await copyFolder(sourcePath, targetPath)
      } else {
        fs.copyFileSync(sourcePath, targetPath)
      }
    }
    console.log('文件夹复制成功')
  } catch (error) {
    console.error('文件夹复制失败:', error)
  }
}
