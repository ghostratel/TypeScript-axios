import { RequestMethod } from '../types/index'

function normalizeHeadersName(headers: any, name: string): void {
  Object.keys(headers).forEach(k => {
    if (k.toUpperCase() === name.toUpperCase() && k !== name) {
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
export function processRequestHeaders(headers: any = {}, requestMethod: RequestMethod): object {
  normalizeHeadersName(headers, 'Content-Type')
  normalizeHeadersName(headers, 'Accept')
  headers = flattenHeaders(headers, requestMethod)
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

const fieldsNeedToBeDeleted = ['get', 'post', 'delete', 'options', 'head', 'patch', 'put']

export function flattenHeaders(headers: any, requestMethod: RequestMethod): any {
  // 将common字段抹平
  for (let key in headers.common) {
    headers[key] = headers[key] || headers.common[key]
  }

  delete headers.common

  // 将当前方法配置的headers抹平

  for (let key in headers[requestMethod]) {
    headers[key] = headers[key] || headers[requestMethod][key]
  }

  for (let key in headers) {
    if (fieldsNeedToBeDeleted.includes(key)) {
      delete headers[key]
    }
  }

  return headers
}
