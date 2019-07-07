import { RequestConfig, ResponsePromise, Response } from '../types/index'
import { processResponse } from '../helpers/response'
import { RequestError } from '../helpers/error'
import { URLSerialization } from '../helpers/url'
import { transformData } from '../helpers/data'
import { processRequestHeaders } from '../helpers/headers'

function processConfig(config: RequestConfig): void {
  const { url, params, data, headers } = config
  config.url = URLSerialization(url, params)
  config.headers = processRequestHeaders(headers, data)
  config.data = transformData(data)
}

export default function dispatchRequest(config: RequestConfig): ResponsePromise {
  processConfig(config)
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'GET',
      data = null,
      headers = {},
      responseType = '',
      timeout = 2000
    } = config
    let xhr = new XMLHttpRequest()

    xhr.open(method, url, true)

    xhr.responseType = responseType
    xhr.timeout = timeout

    Object.keys(headers).forEach(k => {
      xhr.setRequestHeader(k, headers[k])
    })

    xhr.ontimeout = () => {
      reject(new RequestError(`Timeout of ${timeout} ms exceeded.`, config, null, xhr))
    }

    xhr.onerror = () => {
      reject(new RequestError(`Network error.`, config, null, xhr))
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 0) {
        // 请求完成，但不一定成功
        const response: Response = processResponse(xhr, config)
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(response)
        } else {
          reject(
            new RequestError(
              `Request failed with status code ${response.status}.`,
              config,
              response.status,
              xhr,
              response
            )
          )
        }
      }
    }

    xhr.send(data)
  })
}
