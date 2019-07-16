import { RequestConfig, ResponsePromise, Response, TransformFunc } from '../types/index'
import { processResponse } from '../helpers/response'
import { RequestError } from '../helpers/error'
import { URLSerialization } from '../helpers/url'
import { transformData } from '../helpers/data'
import { processRequestHeaders } from '../helpers/headers'
import { isCrossOrigin } from '../helpers/url'
import { cookie } from '../helpers/cookie'

function processConfig(config: RequestConfig): void {
  const { url, params, data, headers } = config
  config.url = URLSerialization(url, params)
  config.headers = processRequestHeaders(headers, config.method!)
  config.data = transformData(data)
}

export default function dispatchRequest(config: RequestConfig): ResponsePromise {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
  processConfig(config)
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers = {},
      responseType = '',
      timeout = 0,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config
    let xhr = new XMLHttpRequest()

    xhr.open(method, url, true)

    xhr.responseType = responseType
    xhr.timeout = timeout

    if (withCredentials || (isCrossOrigin(url) && xsrfCookieName)) {
      const cookieValue = cookie.read(xsrfCookieName!)
      if (cookieValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = cookieValue
      }
    }

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
        let _data: any

        if (!Array.isArray(config.transformResponse)) {
          config.transformResponse = [config.transformResponse!]
        }

        config.transformResponse.forEach(fn => {
          _data = fn(xhr.responseText || xhr.response)
        })

        // 请求完成，但不一定成功
        const response: Response = processResponse(_data, xhr, config)
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

    if (cancelToken) {
      cancelToken.promise
        .then(reason => {
          xhr.abort()
          reject(reason)
        })
        .catch(() => {
          // ignore
        })
    }

    if (withCredentials) {
      xhr.withCredentials = withCredentials
    }

    xhr.send(data)
  })
}
