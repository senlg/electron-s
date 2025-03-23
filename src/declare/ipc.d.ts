type requestBody<T> = {
  eventName: T
  params: any
}

type responseBody = {
  code: number
  data: any
  msg: string | undefined
}

// 过滤出类中的方法名
type MethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]
