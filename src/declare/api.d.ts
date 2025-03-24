import type TabViewApi from '@main/control/tabViewApi'
import type WindowApi from '@main/control/windowApi'

declare type FuncKeys<T extends { onEventFunc; invokeEventFunc }> = {
  OnEventFuncKeys: keyof T['onEventFunc']
  OnInvokeEventFuncKeys: keyof T['invokeEventFunc']
}
// 提取对象的属性键名成联合类型
export type TabViewApiFuncKeys = FuncKeys<TabViewApi>

export type WindowApiFuncKeys = FuncKeys<WindowApi>
