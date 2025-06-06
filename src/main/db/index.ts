import { app } from 'electron'
// import { GlobalObj } from '../global'
import path from 'path'
import fs from 'fs/promises'
// import { PrismaClient } from '@prisma/client'

import { verifyExists } from '@/utils/mainUtils'
import { config } from '@main/global/config'

export const initDb = async () => {
  try {
    let dbPath = config.PRISMA_DATABASE_URL
    // 打包与不打包db文件的位置不同
    if (app.isPackaged) {
      console.log('test')
      if (!verifyExists(path.dirname(dbPath))) {
        await fs.mkdir(path.dirname(dbPath))

        let sourcePath = path.resolve(process.cwd(), './resources/prisma/dev.db')

        await fs.copyFile(sourcePath, dbPath)
      }
    }
    console.log(`\nfile:${dbPath}\n`)
  } catch (error) {
    console.log('initDB error:###\n %s ####\n', error)
  }

  // // 初始化数据库客户端
  // GlobalObj.db = dbPath
  //   ? new PrismaClient({
  //       datasources: {
  //         db: {
  //           url: `file:${dbPath}`
  //         }
  //       }
  //     })
  //   : new PrismaClient()

  // // 连接数据库
  // GlobalObj.db.$connect()
}
