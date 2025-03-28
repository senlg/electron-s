import { GlobalObj } from '@main/global'
import { Menu, MenuItem, nativeImage, Tray } from 'electron'
import logo from '@/../resources/icon.ico?asset'
import icon2 from '@/../resources/icon.png?asset'
import { config } from '@main/global/config'

export const initTray = () => {
  let icon = nativeImage.createFromPath(logo)
  let i = nativeImage.createFromPath(icon2).resize({ width: 16, height: 16 })
  GlobalObj.tray = new Tray(icon)
  // 设置托盘
  setTray(GlobalObj.tray)

  let menu: (MenuItem | Electron.MenuItemConstructorOptions)[] = [
    {
      icon: i,
      label: '测试'
    }
  ]
  const contextMenu = Menu.buildFromTemplate(menu)
  GlobalObj.tray.setContextMenu(contextMenu)
}

const setTray = (tray: Tray) => {
  tray.setTitle(config.APP_NAME)
  tray.setToolTip(`config.APP_NAME:test\nname:${config.APP_NAME}`)
  tray.addListener('click', () => {
    GlobalObj.window?.show()
  })
  // tray.addListener("click", () => {
  //   GlobalObj.window?.show()
  // })
}
