/**
 * 获取对象的所有方法（自身属性 + 原型链）
 * @param {Object} obj - 实例对象
 * @returns {string[]} 方法名数组
 */
export function getAllMethods(obj): string[] {
  const methods = new Set<string>()

  // 1. 获取实例自身的方法
  Object.getOwnPropertyNames(obj)
    .filter((name) => typeof obj[name] === 'function')
    .forEach((method) => methods.add(method))

  // 2. 遍历原型链获取方法
  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    Object.getOwnPropertyNames(proto)
      .filter(
        (name) =>
          name !== 'constructor' &&
          typeof proto[name] === 'function' &&
          [
            '__defineGetter__',
            '__defineSetter__',
            'hasOwnProperty',
            '__lookupGetter__',
            '__lookupSetter__',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toString',
            'valueOf',
            'toLocaleString'
          ].indexOf(name) === -1
      )
      .forEach((method) => methods.add(method))
    proto = Object.getPrototypeOf(proto)
  }

  return Array.from(methods)
}
