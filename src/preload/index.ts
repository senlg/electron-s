import { contextBridge } from 'electron'
import { IpcR } from './customIpc'
import { electronAPI } from '@electron-toolkit/preload'
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
console.log(process.type, 'process.type')

const ApiMap = new Map<string, any>([
  ['process', electronAPI.process],
  ['crash', process],
  ['IpcR', IpcR]
])

if (process.contextIsolated) {
  try {
    ApiMap.forEach((value, key) => {
      contextBridge.exposeInMainWorld(key, value)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  ApiMap.forEach((value, key) => {
    window[key] = value
  })
}
