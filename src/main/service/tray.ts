import { GlobalObj } from '@main/global'
import { app, Menu, MenuItem, nativeImage, Tray } from 'electron'
// import logo from '@/../resources/icons/icon.ico?raw'
// import icon2 from '@/../resources/icons/icon.png?raw'
import { config } from '@main/global/config'
import path from 'path'

export const initTray = () => {
  let icon = nativeImage.createFromPath(path.resolve(__dirname, '../../resources/icons/icon.ico'))
  console.log('path icon', path.resolve(__dirname, '../../resources/icons/icon.png'))

  let i = nativeImage
    .createFromPath(path.resolve(__dirname, '../../resources/icons/icon.png'))
    .resize({ width: 16, height: 16 })
  GlobalObj.tray = new Tray(icon)
  // 设置托盘
  setTray(GlobalObj.tray)

  let menu: (MenuItem | Electron.MenuItemConstructorOptions)[] = [
    {
      icon: i,
      label: '退出',
      click: () => {
        app.quit()
      }
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
