import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron/renderer'

export const IpcR = (channel: string, arg?: ArgsType): void | Promise<responseBody> => {
  const [, type] = channel.split(':')
  console.log(channel, arg)
  try {
    switch (type) {
      case 'send':
        ipcRenderer.send(channel, arg)
        break
      case 'invoke':
        return ipcRenderer.invoke(channel, arg)
      case undefined:
        ipcRenderer.on(channel, arg as (event: Electron.IpcRendererEvent, res: responseBody) => any)
    }
  } catch (error) {
    console.error(error)
  }
 
}

IpcR.prototype = electronAPI.ipcRenderer
