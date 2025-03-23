// import { execSync } from "child_process"

import { spawn } from 'child_process'
// import { app } from 'electron'
import { resolve } from 'path'

export const migrateDb = async () => {
  // execSync()
  // fork
  spawn(process.execPath, [resolve(__dirname, '../../../child.js')])
}
