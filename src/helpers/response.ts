import { Response, RequestConfig } from '../types/index'
import { processResponseHeaders } from '../helpers/headers'

/**
 * 试着将请求返回的文本转成JSON
 *
 * @param {string} responseText
 * @returns {*}
 */
function tryToTransformResponseText(responseText: string): any {
  try {
    responseText = JSON.parse(responseText)
  } catch (err) {
    //
  }
  return responseText
}

/**
 * 处理请求返回结果
 *
 * @export
 * @param {XMLHttpRequest} xhr
 * @param {RequestConfig} config
 * @returns {Response}
 */
export function processResponse(xhr: XMLHttpRequest, config: RequestConfig): Response {
  const response: Response = {
    // 当不设置 config.responseType 时 responseType默认为'' , 与 设置'text'相同 .
    data: xhr.responseType === '' ? tryToTransformResponseText(xhr.responseText) : xhr.response,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: processResponseHeaders(xhr.getAllResponseHeaders()),
    config: config,
    request: xhr
  }
  return response
}
