import * as path from 'path'
import icon from '@/../resources/icon.png?asset'
export type myWindowConfig = Electron.BrowserWindowConstructorOptions & Record<string, any>
export const mainWindowConfig: myWindowConfig = {
  width: 1366,
  height: 768,
  show: false,
  autoHideMenuBar: true,
  frame: false,
  transparent: true,
  icon,
  title: import.meta.env.VITE_APP_TITLE,
  webPreferences: {
    preload: path.join(__dirname, '../../preload/index.js'),
    sandbox: false
  },
  fullscreenable: false,
  isF11: false
}

export const config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME,
  isUploadCrashReportToServer: false,
  CrashReportURL: ''
}
