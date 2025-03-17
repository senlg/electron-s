import { ipcMain } from 'electron'

export default class TranslateApi {
  test() {
    console.log('use test')
    ipcMain.on('ping', (_event, _arg) => {
      console.log('pong')
    })
  }

  tes2() {
    ipcMain.on('test', (event, ...arg) => {
      console.log(typeof arg)
      // console.log();

      console.log('test2', event, ...arg)
      return { test: 100 }
    })
  }
}
