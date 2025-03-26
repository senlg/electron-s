// import { execSync } from "child_process"

import { config } from '@main/global/config'
import { fork } from 'child_process'
import { app } from 'electron'
import { resolve } from 'path'

export const migrateDb = async () => {
  // execSync()
  // fork

  if (app.isPackaged) {
    console.log(resolve(process.cwd(), './resources/node_modules/@prisma/engines/dist/index.js'))

    let a = fork(
      resolve(process.cwd(), './resources/node_modules/@prisma/engines/dist/index.js'),
      ['migrate', 'deploy'],
      {
        silent: true,
        env: {
          ...process.env,
          DATABASE_URL: config.DATABASE_URL
        }
      }
    )
    a.on('exit', () => {
      console.log('exit')
    })
    a.on('spawn', () => {
      console.log('laixiaoxile', a.pid)
    })
    a.on('error', (err) => {
      console.log(err, '\n')
    })
  }
}
