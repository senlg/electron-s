type requestBody = {
  eventName: string
  params?: any
}

type responseBody = {
  code: number
  data: any
  msg: string | undefined
}

type ArgsType = requestBody | ((event: Electron.IpcRendererEvent, res: responseBody) => any)

interface ApiClass {
  sendEventFunc: Record<string, (event: IpcMainEvent, params: any) => void>
  invokeEventFunc: Record<
    string,
    (event: IpcMainInvokeEvent, params: any) => responseBody | (() => void)
  >
}
