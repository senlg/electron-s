import { GlobalObject } from '../global'

export default class WindowApi implements ApiClass {
  invokeEventFunc = {}
  sendEventFunc = {
    // closeMainWindow() {
    //   GlobalObject.window?.close()
    // },

    hideWindow() {
      GlobalObject.window?.hide()
    },

    showMainWindow() {
      GlobalObject.window?.show()
    },

    miniWindow() {
      GlobalObject.window?.minimize()
    },

    maxWindow() {
      GlobalObject.window?.maximize()
    }
  }
}
