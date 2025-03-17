import { ipcMain } from 'electron'
import { GlobalObject } from '../global'
import { ViewConfig } from '../global/viewManager'

export default class TabViewApi {
  createTabView() {
    ipcMain.on('createTabView', (_, arg: ViewConfig) => {
      // 'https://www.facebook.com/messages/t/lanhai/'
      GlobalObject.viewManager?.addView(arg)
    })
  }
  showView() {
    ipcMain.on('showView', (_, arg: { name: string }) => {
      // 'https://www.facebook.com/messages/t/lanhai/'

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
}
