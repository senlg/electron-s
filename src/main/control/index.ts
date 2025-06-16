import TabViewApi from './tabViewApi'
import { Api } from './base'
import WindowApi from './windowApi'
export function mountIpcApi() {
  const apiList = [new TabViewApi(), new WindowApi()]

  // 监听ipc事件
  apiList.forEach((apiInstance) => {
    new Api(apiInstance).init()
  })
}
