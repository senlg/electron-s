import { ipcMain } from 'electron'

export class Api<T extends ApiClass> {
  apiClass: T
  constructor(apiClass: T) {
    this.apiClass = apiClass
  }

  init() {
    this.on()
    this.invoke()
  }
  on() {
    ipcMain.on(`${this.apiClass.constructor.name}:send`, (event, arg: requestBody) => {
      let { eventName, params = {} } = arg
      if (this.apiClass.sendEventFunc && this.apiClass.sendEventFunc[eventName]) {
        this.apiClass.sendEventFunc[eventName](event, params)
      } else {
        console.error(`sendEventFunc is null or eventName ${eventName} not found`)
      }
    })
  }

  invoke() {
    ipcMain.handle(`${this.apiClass.constructor.name}:invoke`, (event, arg: requestBody) => {
      let { eventName, params = {} } = arg
      if (this.apiClass.invokeEventFunc && this.apiClass.invokeEventFunc[eventName]) {
        return this.apiClass.invokeEventFunc[eventName](event, params)
      } else {
        console.error(`invokeEventFunc is null or eventName ${eventName} not found`)
        return null
      }
    })
  }
}
