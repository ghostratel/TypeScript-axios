import { isObject } from './utils'

function normalizeHeadersName(headers: any, name: string): void {
  Object.keys(headers).forEach(k => {
    if (headers[k].toUpperCase() === name.toUpperCase()) {
      headers[name] = headers[k]
      delete headers[k]
    }
  })
}

export function processHeaders(headers: any = {}, data: any): object {
  if (isObject(data)) {
    normalizeHeadersName(headers, 'Content-Type')
    !headers['Content-Type'] && (headers['Content-Type'] = 'application/json; charset=utf-8')
  }
  return headers
}
