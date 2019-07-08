import {
  InterceptorRejectedFn,
  InterceptorResolvedFn,
  InterceptorInterface,
  InterceptorsControllerInterface,
  Response,
  RequestConfig
} from '../types/index'

class Interceptor<T> implements InterceptorInterface<T> {
  resolved: InterceptorResolvedFn<T>
  rejected: InterceptorRejectedFn | undefined
  constructor(resolvedFn: InterceptorResolvedFn<T>, rejectedFn?: InterceptorRejectedFn) {
    this.resolved = resolvedFn
    this.rejected = rejectedFn
  }
}

class BaseInterceptorsController<T> {
  protected interceptors: (Interceptor<T> | null)[]
  eject(id: number): void {
    this.interceptors[id] && (this.interceptors[id] = null)
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  constructor() {
    this.interceptors = []
  }
}

export class RequestInterceptorsController extends BaseInterceptorsController<RequestConfig>
  implements InterceptorsControllerInterface<RequestConfig> {
  use(
    resolvedFn: InterceptorResolvedFn<RequestConfig>,
    rejectedFn?: InterceptorRejectedFn
  ): number {
    this.interceptors.unshift(new Interceptor(resolvedFn, rejectedFn))
    return this.interceptors.length
  }
  constructor() {
    super()
  }
}

export class ResponseInterceptorsController extends BaseInterceptorsController<Response>
  implements InterceptorsControllerInterface<Response> {
  use(resolvedFn: InterceptorResolvedFn<Response>, rejectedFn?: InterceptorRejectedFn): number {
    this.interceptors.push(new Interceptor(resolvedFn, rejectedFn))
    return this.interceptors.length
  }
  constructor() {
    super()
  }
}
