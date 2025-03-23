import { ElectronAPI } from '@electron-toolkit/preload'
declare global {
  interface Window {
    api: unknown
    IpcR: {
      (channel: string, arg: ArgsType): void | Promise<responseBody>
      prototype: IpcRenderer
    }
  }
}
