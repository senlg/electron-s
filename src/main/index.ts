import { app } from 'electron'
import { electronApp } from '@electron-toolkit/utils'

import { GlobalObject } from './global/index'
import { createWindow, onMainBwReisze } from './service/window'
import { appMountListener } from './service/app'
import { mountIpcApi } from './control'
import { config } from './global/config'
import { initDb } from './db'
import { migrateDb } from './db/migrateDb'

const beforeStart = async () => {
  try {
    // 运行prisma 迁移 看看是否更新了数据库结构
    await migrateDb()
    return true
  } catch (error) {
    return false
  }
}

start()
async function start() {
  const isStart = await beforeStart()

  if (isStart) {
    console.log(process.env)
    // app初始化
    init()

    // 应用准备初始化
    app.whenReady().then(() => {
      // ipc初始化
      mountIpcApi()
      // 创建窗口
      GlobalObject.window = createWindow(config)

      // 给窗口绑定事件
      onMainBwReisze(GlobalObject.window)
    })
  }
}
function init() {
  console.log('init___env', import.meta.env)

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // 初始化赋值数据库
  initDb()

  GlobalObject.db?.user
    .findUnique({
      select: { email: true },
      where: {
        email: 'alice@prisma.io'
      }
    })
    .then((res) => {
      console.log(res)
    })

  // 应用挂载事件监听
  appMountListener()
}

const getAppAllPah = () => {
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
}
// app path
getAppAllPah()
