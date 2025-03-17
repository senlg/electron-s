import TranslateApi from './translate'
import TabViewApi from './tabView'

import { getAllMethods } from '../../utils'

export function mountIpcApi() {
  const APIARR = [new TranslateApi(), new TabViewApi()]

  // 监听ipc事件
  APIARR.forEach((apiInstance) => {
    getAllMethods(apiInstance).forEach((method) => {
      apiInstance[method]()
    })
  })
}
