import { IpcMainInvokeEvent } from 'electron'
import { GlobalObj } from '../global'

export default class WindowApi implements ApiClass {
  invokeEventFunc = {
    test: function (_event: IpcMainInvokeEvent, params: any) {
      return {
        code: 1,
        data: params
      }
    }
  }
  sendEventFunc = {
    // closeMainWindow() {
    //   GlobalObj.window?.close()
    // },

    hideWindow() {
      GlobalObj.window?.hide()
    },

    showMainWindow() {
      GlobalObj.window?.show()
    },

    miniWindow() {
      GlobalObj.window?.minimize()
    },

    maxWindow() {
      console.log('max window')

      GlobalObj.window?.isMaximized() ? GlobalObj.window.unmaximize() : GlobalObj.window?.maximize()
    }
  }
}
