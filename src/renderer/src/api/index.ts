// TabViewApi
import type {
  TabViewApiInvokeEventFuncKeys,
  TabViewApiSendEventFuncKeys
} from '@/main/control/tabViewApi'

export const TabViewApiSend = (eventName: TabViewApiSendEventFuncKeys, params: any) => {
  window.IpcR('TabViewApi:send', {
    eventName,
    params
  })
}
export const TabViewApiInvoke = (eventName: TabViewApiInvokeEventFuncKeys, params: any) => {
  window.IpcR('TabViewApi:invoke', {
    eventName,
    params
  })
}
