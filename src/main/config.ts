import * as path from 'path'
import icon from '../../resources/icon.png?asset'
export const config: Electron.BrowserWindowConstructorOptions = {
  width: 1366,
  height: 768,
  show: false,
  autoHideMenuBar: true,
  frame: false,
  transparent: true,
  icon,
  title: 'myelectronapp',
  webPreferences: {
    preload: path.join(__dirname, '../preload/index.js'),
    sandbox: false
  }
}
