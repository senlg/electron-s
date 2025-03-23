import { ipcMain } from 'electron'
import { GlobalObject } from '../global'

export default class windowApi {
  closeMainWindow() {
    // ipcMain.on('win:closeMainWindow', (_event, _arg) => {})
  }

  hideWindow() {
    GlobalObject.window?.hide()
  }

  showMainWindow() {
    GlobalObject.window?.show()
  }

  miniWindow() {
    GlobalObject.window?.minimize()
  }
  maxWindow() {
    GlobalObject.window?.maximize()
  }
}
