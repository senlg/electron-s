import { BrowserWindow, WebContentsView, WebContentsViewConstructorOptions } from 'electron'
import { GlobalObject } from '.'
import path from 'path'

export class ViewManager {
  constructor() {
    this.viewsMap = new Map()
  }

  viewsMap: Map<string, ViewInfo>

  setViewBounds(
    view: ViewInfo,
    { x, y }: { x: number; y: number },
    bw: BrowserWindow = GlobalObject.window!
  ) {
    const bwBounds = bw.getBounds()
    // TODO 渲染进程传递过来 x，y
    view.setBounds({
      x,
      y,
      width: bwBounds.width - x,
      height: bwBounds.height - y
    })
  }
  addView<T extends ViewConfig>(viewConfig: T) {
    try {
      let view: ViewInfo
      if (!this.viewsMap.has(viewConfig.name)) {
        view = new ViewInfo({
          ...viewConfig,
          webPreferences: {
            preload: path.join(__dirname, '../../preload/index.js'),
            sandbox: false
          }
        })
        this.setViewBounds(view, { x: 50, y: 50 })
        view.webContents.loadURL(viewConfig.url)
        GlobalObject.window?.contentView.addChildView(view)
        this.viewsMap.set(viewConfig.name, view)
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  getView(name: string) {
    return this.viewsMap.get(name)
  }
  deleteView(name) {
    return this.viewsMap.delete(name)
  }
}

export type ViewConfig = { name: string; url: string } & Omit<
  WebContentsViewConstructorOptions,
  'webContents'
>

class ViewInfo extends WebContentsView {
  constructor(viewConfig: ViewConfig) {
    super(viewConfig)
    this.name = viewConfig.name
    this.url = viewConfig.url
  }
  name: string
  url: string
}
