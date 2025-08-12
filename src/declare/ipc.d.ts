type requestBody = {
  eventName: string
  params?: any
}

type responseBody = {
  code: number
  data: any
  msg?: string
}

type ArgsType = requestBody | ((event: Electron.IpcRendererEvent, res: responseBody) => any)

interface ApiClass {
  sendEventFunc: Record<string, (event: IpcMainEvent, params: any) => void>
  invokeEventFunc: Record<string, (event: IpcMainInvokeEvent, params: any) => responseBody>
}
type SendEventFuncKeys<T extends ApiClass> = Extract<keyof T['sendEventFunc'], string>
type InvokeEventFuncKeys<T extends ApiClass> = Extract<keyof T['invokeEventFunc'], string>
