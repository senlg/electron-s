import { GlobalObject } from '../global'
import { ViewConfig } from '../service/viewManager'
import { MyApi } from '.'

const onEventFunc = {
  createTabView(_, arg: ViewConfig) {
    GlobalObject.viewManager?.addView(arg)
  },
  showView(_, arg: { name: string }) {
    let view = GlobalObject.viewManager?.getView(arg.name)!
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

export default class TabViewApi extends MyApi<TabViewApi> {
  invokeEventFunc = {}

  onEventFunc = onEventFunc
}
