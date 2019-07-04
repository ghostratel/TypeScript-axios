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

export function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%2B/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
