import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import * as path from 'path'
import { GlobalObject } from '../global'

export function createWindow(config: Electron.BrowserWindowConstructorOptions): BrowserWindow {
  // Create the browser window.
  const bw = new BrowserWindow(config)

  bw.on('ready-to-show', () => {
    bw.show()
  })

  bw.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    bw.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    bw.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  return bw
}

export function onMainBwReisze(bw: BrowserWindow) {
  bw.on('resize', () => {
    GlobalObject.viewManager?.viewsMap.forEach((view) => {
      GlobalObject.viewManager?.setViewBounds(view, { x: 50, y: 50 }, bw)
    })
  })
}
