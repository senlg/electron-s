import { app, BrowserWindow } from 'electron'
import { createWindow } from './window'
import { optimizer } from '@electron-toolkit/utils'
import { GlobalObject } from './global'
import { config } from './config'
export const appMountListener = () => {
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      GlobalObject.window = createWindow(config)
    }
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  // 开发环境启用f12 打开开发者工具， 生产环境禁用
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
}
