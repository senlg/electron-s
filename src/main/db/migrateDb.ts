// import { execSync } from "child_process"

// import { config } from '@main/global/config'
// import { fork, Serializable } from 'child_process'
// import { app } from 'electron'
// import { resolve } from 'path'

export const migrateDb = async () => {
  // execSync()
  // fork
  // if (app.isPackaged) {
  //   console.log(resolve(process.cwd(), './resources/node_modules/@prisma/engines/dist/index.js'))
  //   let a = fork(
  //     resolve(process.cwd(), './resources/node_modules/@prisma/engines/dist/index.js'),
  //     ['migrate', 'deploy'],
  //     {
  //       silent: true,
  //       stdio: 'pipe',
  //       env: {
  //         ...process.env,
  //         DATABASE_URL: config.DATABASE_URL
  //       }
  //     }
  //   )
  //   a.on('message', (message: Serializable) => {
  //     console.log('\nmessage: %s\n', message)
  //   })
  //   a.stdout?.on('data', function (data) {
  //     // console.log(data)
  //     console.info('prisma: ', data.toString())
  //   })
  //   a.stderr?.on('data', function (data) {
  //     console.error('prisma: ', data.toString())
  //   })
  //   a.on('exit', () => {
  //     console.log('exit')
  //   })
  //   a.on('spawn', () => {
  //     console.log('laixiaoxile', a.pid)
  //   })
  //   a.on('error', (err) => {
  //     console.log(err, '\n')
  //   })
  // }
}
