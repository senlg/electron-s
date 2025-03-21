import { app } from 'electron'
import { GlobalObject } from '../global'
import path from 'path'
import { PrismaClient } from '@prisma/client'

export const initDb = () => {
  let dbPath
  if (app.isPackaged) {
    dbPath = path.resolve(app.getPath('userData'), './db/prisma.db')
  }
  // 初始化数据库客户端
  GlobalObject.db = dbPath
    ? new PrismaClient({
        datasources: {
          db: {
            url: dbPath
          }
        }
      })
    : new PrismaClient()

  // 连接数据库
  GlobalObject.db.$connect()
}
