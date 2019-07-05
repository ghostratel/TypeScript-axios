import { RequestConfig } from './types/index'

export default function xhr(config: RequestConfig): void {
  const { url, method = 'GET', data = null, headers = {} } = config
  let xhr = new XMLHttpRequest()
  xhr.open(method, url, true)

  Object.keys(headers).forEach(k => {
    xhr.setRequestHeader(k, headers[k])
  })

  xhr.send(data)
}
