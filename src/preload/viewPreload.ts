import { ipcRenderer } from 'electron'

export const a = {
  ipcRenderer: {
    send: (channel: string, ...args) => {
      ipcRenderer.send(channel, ...args)
    },
    on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => any) => {
      ipcRenderer.on(channel, listener)
    },
    invoke: (channel: string, ...args: any[]): Promise<any> => {
      return ipcRenderer.invoke(channel, ...args)
    }
  }
}
