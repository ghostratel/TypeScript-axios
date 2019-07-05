import { isObject } from './utils'

function normalizeHeadersName(headers: any, name: string): void {
  Object.keys(headers).forEach(k => {
    if (headers[k].toUpperCase() === name.toUpperCase()) {
      headers[name] = headers[k]
      delete headers[k]
    }
  })
}

/**
 * 根据配置生成请求头
 *
 * @export
 * @param {*} [headers={}]
 * @param {*} data
 * @returns {object}
 */
export function processRequestHeaders(headers: any = {}, data: any): object {
  if (isObject(data)) {
    normalizeHeadersName(headers, 'content-type')
    !headers['content-type'] && (headers['content-type'] = 'application/json; charset=utf-8')
  }
  return headers
}

/**
 * 将响应头的字符串处理为键值对的形式
 *
 * @export
 * @param {string} headersString
 * @returns {*}
 */
export function processResponseHeaders(headersString: string): any {
  const ret: any = {}
  headersString.split(/\r\n/).forEach(line => {
    if (!line) {
      return
    }
    let [key, value] = line.split(':').map(s => s.trim())
    ret[key] = value
  })
  return ret
}
