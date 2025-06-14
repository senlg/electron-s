import { GlobalObj } from '@main/global'
import { Menu, MenuItem, nativeImage, Tray } from 'electron'
import logoIco from '@/../resources/icons/icon.ico'
import logoPng from '@/../resources/icons/icon.png'
import { config } from '@main/global/config'
import path from 'path'

export const initTray = () => {
  let iconIco = nativeImage.createFromPath(path.resolve(__dirname + logoIco))
  GlobalObj.tray = new Tray(iconIco)

  let iconPng = nativeImage
    .createFromPath(path.resolve(__dirname + logoPng))
    .resize({ width: 18, height: 18 })
  // 设置托盘
  setTray(GlobalObj.tray)
  let menu: (MenuItem | Electron.MenuItemConstructorOptions)[] = [
    {
      icon: iconPng,
      label: '测试'
    }
  ]
  const contextMenu = Menu.buildFromTemplate(menu)
  GlobalObj.tray.setContextMenu(contextMenu)
}

const setTray = (tray: Tray) => {
  tray.setTitle(config.APP_NAME)
  tray.setToolTip(`QQ:929040862 \n 应用名称:${config.APP_NAME} \n 声音:关闭`)
  tray.addListener('click', () => {
    GlobalObj.window?.show()
  })
  // tray.addListener("click", () => {
  //   GlobalObj.window?.show()
  // })
}
