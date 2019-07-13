import { Response, RequestConfig } from '../types/index'
import { processResponseHeaders } from '../helpers/headers'

/**
 * 处理请求返回结果
 *
 * @export
 * @param {XMLHttpRequest} xhr
 * @param {RequestConfig} config
 * @returns {Response}
 */
export function processResponse(data: any, xhr: XMLHttpRequest, config: RequestConfig): Response {
  const response: Response = {
    // 当不设置 config.responseType 时 responseType默认为'' , 与 设置'text'相同 .
    data: data,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: processResponseHeaders(xhr.getAllResponseHeaders()),
    config: config,
    request: xhr
  }
  return response
}
