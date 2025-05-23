import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow, shell } from 'electron'
import * as path from 'path'
import { GlobalObj } from '../global'
import { myWindowConfig } from '../global/config'

export function createMainWindow(config: myWindowConfig): BrowserWindow {
  // Create the browser window.
  const bw = new BrowserWindow(config)

  // 监听webConents事件
  setWebContentsHandler(bw, config)
  // 监听window事件
  onMainBwReisze(bw)
  // 设置鼠标菜单事件
  cancelMouseMenu(bw)
  bw.on('ready-to-show', () => {
    bw.show()
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    bw.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    console.log(path.join(__dirname))

    console.log(path.join(app.getPath('exe'), '../resources/renderer.asar/index.html'))

    bw.loadFile(path.join(app.getPath('exe'), '../resources/renderer.asar/index.html'))
  }
  return bw
}

const setWebContentsHandler = (bw: BrowserWindow, c: myWindowConfig) => {
  bw.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11' && !c.isF11) {
      // 阻止默认行为，即阻止进入全屏模式
      event.preventDefault()
    }
  })
  bw.webContents.on('did-fail-load', (event: Electron.Event) => {
    console.log('did-fail-load', event, '\n')
  })
  bw.webContents.on('render-process-gone', (_event, details) => {
    console.log('render-process-gone reason:', details.reason)
  })
  bw.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
}

const onMainBwReisze = (bw: BrowserWindow) => {
  bw.on('resize', () => {
    GlobalObj.viewManager?.viewsMap.forEach((view) => {
      GlobalObj.viewManager?.setViewBounds(view, { x: 50, y: 50 }, bw)
    })
  })
}

const cancelMouseMenu = (bw: BrowserWindow) => {
  if (process.platform === 'win32') {
    bw.hookWindowMessage(278, () => {
      bw.setEnabled(false)
      setTimeout(() => {
        bw.setEnabled(true)
      })

      return true
    })
  }
}

