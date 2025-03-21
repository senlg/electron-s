import { ipcMain } from 'electron'
import { GlobalObject } from '../global'
import { ViewConfig } from '../service/viewManager'

export default class TabViewApi {
  createTabView() {
    ipcMain.on('createTabView', (_, arg: ViewConfig) => {
      GlobalObject.viewManager?.addView(arg)
    })
  }
  showView() {
    ipcMain.on('showView', (_, arg: { name: string }) => {
      let view = GlobalObject.viewManager?.getView(arg.name)!
      view ? GlobalObject.window?.contentView.addChildView(view) : console.log('null view')
    })
  }
  showWindow() {
    ipcMain.on('showWindow', (_) => {
      GlobalObject.viewManager?.viewsMap.forEach((view) => {
        GlobalObject.window?.contentView.removeChildView(view)
      })
    })
  }
  deleteView() {
    ipcMain.on('deleteView', (_, name: string) => {
      const v = GlobalObject.viewManager?.getView(name)
      if (v) {
        GlobalObject.window?.contentView.removeChildView(v)
        GlobalObject.viewManager?.deleteView(name)
      } else {
        // TODO 是否返回删除失败
      }
    })
  }
}
