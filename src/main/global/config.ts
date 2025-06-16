import * as path from 'path'
import { app } from 'electron'
import logo from '@/../resources/icons/icon.png'
export type myWindowConfig = Electron.BrowserWindowConstructorOptions & Record<string, any>
export const mainWindowConfig: myWindowConfig = {
  width: 1366,
  height: 768,
  show: false,
  autoHideMenuBar: true,
  frame: false,
  transparent: true,
  logo,
  minHeight: 720,
  minWidth: 1250,
  title: import.meta.env.VITE_APP_TITLE,
  minHeight: 700,
  minWidth: 1245,
  webPreferences: {
    preload: path.join(__dirname, '../preload/index.js'),
    sandbox: false
  },
  fullscreenable: false,
  isF11: false
}

export const config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME,
  isUploadCrashReportToServer: false,
  CrashReportURL: '',
  PRISMA_DATABASE_URL: app.isPackaged
    ? path.resolve(app.getPath('userData'), './db', './prisma.db')
    : ''
}
