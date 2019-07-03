import { RequestConfig } from './types/index'

export default function xhr(config: RequestConfig): void {
  const { url, method = 'GET', data = null } = config
  let xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.send(data)
}
