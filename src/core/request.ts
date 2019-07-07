import { RequestInterface, RequestConfig, ResponsePromise } from '../types/index'
import dispatchRequest from './dispatchRequest'

export default class Request implements RequestInterface {
  [index: string]: any

  request(url: string | RequestConfig, config: any = { method: 'GET' }): ResponsePromise {
    return typeof url === 'string'
      ? dispatchRequest(Object.assign(config, { url }))
      : dispatchRequest(url)
  }

  get(url: string, config: any = {}): ResponsePromise {
    return this.request(url, Object.assign(config, { method: 'GET' }))
  }

  delete(url: string, config: any = {}): ResponsePromise {
    return this.request(url, Object.assign(config, { method: 'DELETE' }))
  }

  head(url: string, config: any = {}): ResponsePromise {
    return this.request(url, Object.assign(config, { method: 'HEAD' }))
  }

  options(url: string, config: any = {}): ResponsePromise {
    return this.request(url, Object.assign(config, { method: 'OPTIONS' }))
  }

  post(url: string, data: any = {}, config: any = {}): ResponsePromise {
    return this.request(url, Object.assign(config, { data, method: 'POST' }))
  }

  patch(url: string, data: any = {}, config: any = {}): ResponsePromise {
    return this.request(url, Object.assign(config, { data, method: 'PATCH' }))
  }

  put(url: string, data: any = {}, config: any = {}): ResponsePromise {
    return this.request(url, Object.assign(config, { data, method: 'PUT' }))
  }
}
