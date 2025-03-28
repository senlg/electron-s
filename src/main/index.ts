import { app } from 'electron'
import { electronApp } from '@electron-toolkit/utils'

import { GlobalObj } from './global/index'
import { createMainWindow } from './service/window'
import { appMountListener } from './service/app'
import { mountIpcApi } from './control'
import { mainWindowConfig } from './global/config'
import { initDb } from './db'
import { migrateDb } from './db/migrateDb'
import { ViewManager } from './service/viewManager'
import { initCrashReporter } from './service/crashReporter'
import { initTray } from './service/tray'

// app启动之前的操作
const beforeStart = async () => {
  try {
    // 运行prisma 迁移 看看是否更新了数据库结构
    await migrateDb()
    return true
  } catch (error) {
    return false
  }
}

main()
async function main() {
  console.log('func string: %s', beforeStart.toString())

  const isStart = await beforeStart()
  if (isStart) {
    // 应用准备进行窗口的创建
    app.whenReady().then(async () => {
      // app初始化
      await init()
      // ipc初始化
      mountIpcApi()
      // 创建窗口
      GlobalObj.window = createMainWindow(mainWindowConfig)
    })
  }
}

// 初始化函数
async function init() {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // 启动崩溃日志收集
  initCrashReporter()
  // 创建系统托盘
  initTray()
  // 应用挂载事件监听
  appMountListener()
  // 初始化全局view管理对象
  GlobalObj.viewManager = new ViewManager()
  // 初始化赋值数据库
  await initDb()
}

// 打印路径
;(() => {
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
    console.log(`\n${item}:\n`, app.getPath(item))
  })
})()
