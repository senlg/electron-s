// import { execSync } from "child_process"

import { fork } from 'child_process'
// import { app } from 'electron'
import { resolve } from 'path'

export const migrateDb = async () => {
  // execSync()
  // fork
  let a = fork(resolve(__dirname, '../childProcess/index.js'), {
    stdio: 'pipe'
  })
  a.on('error', (err) => {
    console.log(err, '\n')
  })
}
