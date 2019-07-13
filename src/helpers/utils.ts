const protoToString = Object.prototype.toString

export function isArray(arr: any): arr is [] {
  return Array.isArray(arr)
}

export function isDate(date: any): date is Date {
  return protoToString.call(date) === '[object Date]'
}

export function isObject(o: any): o is Object {
  return protoToString.call(o) === '[object Object]'
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return val instanceof URLSearchParams
}

export function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 一层深拷贝
 *
 * @export
 * @param {*} target
 * @returns {*}
 */
export function deepCopy(target: any): any {
  let ret = Object.create(null)

  for (let key in target) {
    if (isObject(target[key])) {
      ret[key] = { ...target[key] }
      continue
    }
    if (isArray(target[key])) {
      ret[key] = [...target[key]]
      continue
    }
    ret[key] = target[key]
  }
  return ret
}
