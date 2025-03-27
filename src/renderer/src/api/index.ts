// TabViewApi
import type TabViewApi from '@/main/control/tabViewApi'

export const TabViewApiSend = (eventName: SendEventFuncKeys<TabViewApi>, params?: any) => {
  window.IpcR('TabViewApi:send', {
    eventName,
    params
  })
}
export const TabViewApiInvoke = (eventName: InvokeEventFuncKeys<TabViewApi>, params?: any) => {
  return window.IpcR('TabViewApi:invoke', {
    eventName,
    params
  }) as Promise<responseBody>
}

// WindowApi

import WindowApi from '@/main/control/windowApi'

export const WindowApiSend = (eventName: SendEventFuncKeys<WindowApi>, params?: any) => {
  window.IpcR('WindowApi:send', {
    eventName,
    params
  })
}
export const WindowApiInvoke = async (eventName: InvokeEventFuncKeys<WindowApi>, params?: any) => {
  return window.IpcR('WindowApi:invoke', {
    eventName,
    params
  }) as Promise<responseBody>
}
