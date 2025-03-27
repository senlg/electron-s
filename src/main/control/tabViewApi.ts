import { GlobalObj } from '../global'
import { ViewConfig } from '../service/viewManager'

export default class TabViewApi implements ApiClass {
  invokeEventFunc = {}
  sendEventFunc = {
    createTabView(_, params: ViewConfig) {
      GlobalObj.viewManager?.addView(params)
    },
    showView(_, params: { name: string }) {
      const view = GlobalObj.viewManager?.getView(params.name)!
      view ? GlobalObj.window?.contentView.addChildView(view) : console.log('null view')
    },
    showWindow() {
      GlobalObj.viewManager?.viewsMap.forEach((view) => {
        GlobalObj.window?.contentView.removeChildView(view)
      })
    },
    deleteView(_, name: string) {
      const v = GlobalObj.viewManager?.getView(name)
      if (v) {
        GlobalObj.window?.contentView.removeChildView(v)
        GlobalObj.viewManager?.deleteView(name)
      }
    }
  }
}
