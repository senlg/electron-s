import TabViewApi from './tabViewApi'
import { Api } from './base'
import WindowApi from './windowApi'
export function mountIpcApi() {
  const APIARR = [new TabViewApi(), new WindowApi()]

  // 监听ipc事件
  APIARR.forEach((apiInstance) => {
    let api = new Api(apiInstance)
    api.on()
    api.invoke()
  })
}

// export type { TabViewApiOnEventFuncKeys } from './tabViewApi'
