import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { a } from './viewPreload'
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

console.log(process.type, 'process.type')

const ApiMap = new Map([
  ['electron', electronAPI],
  ['a', a]
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
  window.electron = electronAPI
}
