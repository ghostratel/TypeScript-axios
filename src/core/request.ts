import {
  RequestInterface,
  RequestConfig,
  ResponsePromise,
  InterceptorResolvedFn,
  InterceptorRejectedFn,
  Defaults
} from '../types/index'
import dispatchRequest from './dispatchRequest'
import { RequestInterceptorsController, ResponseInterceptorsController } from './interceptors'

interface Interceptors {
  request: RequestInterceptorsController
  response: ResponseInterceptorsController
}

interface PromiseChain<T> {
  resolved: InterceptorResolvedFn<T> | ((config: RequestConfig) => ResponsePromise)
  rejected?: InterceptorRejectedFn
}

export default class Request implements RequestInterface {
  [index: string]: any

  defaults: Defaults

  interceptors: Interceptors

  request(url: string | RequestConfig, config: any = { method: 'GET' }): ResponsePromise {
    const _config: RequestConfig = typeof url === 'string' ? { ...config, url } : url

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.push(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(_config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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

  constructor(cfg: Defaults) {
    this.interceptors = {
      request: new RequestInterceptorsController(),
      response: new ResponseInterceptorsController()
    }

    this.defaults = cfg
  }
}
