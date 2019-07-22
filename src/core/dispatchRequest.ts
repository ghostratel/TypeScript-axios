import { RequestConfig, ResponsePromise, Response, TransformFunc } from '../types/index'
import { processResponse } from '../helpers/response'
import { RequestError } from '../helpers/error'
import { URLSerialization, isCrossOrigin } from '../helpers/url'
import { transformData } from '../helpers/data'
import { processRequestHeaders } from '../helpers/headers'
import { cookie } from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

function processConfig(config: RequestConfig): void {
  const { url, params, data, headers, paramsSerializer } = config
  config.url = URLSerialization(url!, params, paramsSerializer)
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
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    let xhr = new XMLHttpRequest()

    xhr.open(method, url!, true)

    xhr.responseType = responseType
    xhr.timeout = timeout

    if (withCredentials || (isCrossOrigin(url!) && xsrfCookieName)) {
      const cookieValue = cookie.read(xsrfCookieName!)
      if (cookieValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = cookieValue
      }
    }

    if (isFormData(data)) {
      delete headers['Content-Type']
    }

    if (auth) {
      headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
    }

    Object.keys(headers).forEach(k => {
      xhr.setRequestHeader(k, headers[k])
    })

    if (onDownloadProgress) {
      xhr.onprogress = onDownloadProgress
    }

    if (onUploadProgress) {
      xhr.upload.onprogress = onUploadProgress
    }

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
        if (!validateStatus || validateStatus(xhr.status)) {
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
