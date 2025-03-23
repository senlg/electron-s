import TranslateApi from './translateApi'
import TabViewApi from './tabViewApi'

import { getAllMethods } from '../../utils'
import { ipcMain } from 'electron'

export function mountIpcApi() {
  const APIARR = [new TranslateApi(), new TabViewApi()]

  // 监听ipc事件
  APIARR.forEach((apiInstance) => {
    getAllMethods(apiInstance).forEach((method) => {
      apiInstance[method]()
    })
  })
}

export abstract class MyApi<T> {
  abstract onEventFunc: Record<
    string,
    (event: Electron.IpcMainEvent, arg: any) => void | (() => void)
  >
  abstract invokeEventFunc: Record<
    MethodNames<T>,
    (event: Electron.IpcMainInvokeEvent, arg: any) => responseBody | (() => void)
  >
  on() {
    ipcMain.on(
      `${this.constructor.name}:on`,
      (event, arg: requestBody<MethodNames<typeof this.onEventFunc>>) => {
        let { eventName, params } = arg
        this.onEventFunc[eventName](event, params)
      }
    )
  }
  invoke() {
    ipcMain.handle(
      `${this.constructor.name}:invoke`,
      (event, arg: requestBody<MethodNames<typeof this.onEventFunc>>) => {
        let { eventName, params } = arg
        this.invokeEventFunc[eventName](event, params)
      }
    )
  }
}
