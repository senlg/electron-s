import { GlobalObject } from '../global'
import { ViewConfig } from '../service/viewManager'

export default class TabViewApi implements ApiClass {
  invokeEventFunc = {}
  sendEventFunc = {
    createTabView(_, params: ViewConfig) {
      GlobalObject.viewManager?.addView(params)
    },
    showView(_, params: { name: string }) {
      const view = GlobalObject.viewManager?.getView(params.name)!
      view ? GlobalObject.window?.contentView.addChildView(view) : console.log('null view')
    },
    showWindow() {
      GlobalObject.viewManager?.viewsMap.forEach((view) => {
        GlobalObject.window?.contentView.removeChildView(view)
      })
    },
    deleteView(_, name: string) {
      const v = GlobalObject.viewManager?.getView(name)
      if (v) {
        GlobalObject.window?.contentView.removeChildView(v)
        GlobalObject.viewManager?.deleteView(name)
      }
    }
  }
}
export type TabViewApiSendEventFuncKeys = keyof TabViewApi['sendEventFunc']
export type TabViewApiInvokeEventFuncKeys = keyof TabViewApi['invokeEventFunc']
