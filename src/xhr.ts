import { RequestConfig, ResponsePromise, Response } from './types/index'
import { processResponse } from './helpers/response'

export default function xhr(config: RequestConfig): ResponsePromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'GET', data = null, headers = {}, responseType = '' } = config
    let xhr = new XMLHttpRequest()

    xhr.open(method, url, true)

    xhr.responseType = responseType

    Object.keys(headers).forEach(k => {
      xhr.setRequestHeader(k, headers[k])
    })

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        // 请求出错
        return
      }
      const response: Response = processResponse(xhr, config)
      resolve(response)
    }

    xhr.send(data)
  })
}
