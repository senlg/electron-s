import { app, WebContentsView } from 'electron'
import { electronApp } from '@electron-toolkit/utils'
import { GlobalObject } from './global'
import { createWindow, onMainBwReisze } from './window'
import { appMountListener } from './app'
import { mountIpcApi } from './service'
import { config } from './config'

import { PrismaClient } from '@prisma/client'
import { ViewManager } from './global/viewManager'

console.log('app.getAppPath()', app.getAppPath())

let arr = [
  'home',
  'appData',
  'userData',
  'sessionData',
  'temp',
  'exe',
  'module',
  'desktop',
  'documents',
  'downloads',
  'music',
  'pictures',
  'videos',
  'recent',
  'logs',
  'crashDumps'
]

arr.forEach((item: any) => {
  console.log(item, app.getPath(item))
})

function start() {
  console.log(process.env)

  // 初始化
  init()
  // 应用挂载事件监听
  appMountListener()
  // 应用准备初始化
  app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // ipc初始化
    mountIpcApi()

    // 创建窗口
    GlobalObject.window = createWindow(config)

    // 给窗口绑定事件
    onMainBwReisze(GlobalObject.window)
  })
}
function init() {
  // 初始化赋值数据库
  GlobalObject.db = new PrismaClient({
    // datasources: {
    //   db: {
    //     url: ''
    //   }
    // }
  })

  // 初始化ViewMap
  GlobalObject.viewManager ??= new ViewManager()
}

start()
