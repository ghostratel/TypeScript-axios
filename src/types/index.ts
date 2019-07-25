export type RequestMethod =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface RequestConfig {
  [index: string]: any
  url?: string
  method?: RequestMethod
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  transformRequest?: TransformFunc | TransformFunc[]

  transformResponse?: TransformFunc | TransformFunc[]

  cancelToken?: CancelToken

  withCredentials?: boolean

  xsrfCookieName?: string

  xsrfHeaderName?: string

  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void

  auth?: RequestAuthorization

  validateStatus?: (status: number) => boolean

  paramsSerializer?: (params: any) => string

  baseURL?: string
}

export interface Response {
  data: any
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface ResponsePromise extends Promise<Response | RequestConfig> {}

export interface RequestErrorInterface extends Error {
  config: RequestConfig
  code?: number | null
  request: XMLHttpRequest
  response?: Response | null
}

export interface RequestInterface {
  [index: string]: any

  defaults: RequestConfig

  interceptors: {
    request: InterceptorsControllerInterface<RequestConfig>
    response: InterceptorsControllerInterface<Response>
  }

  request(url: string, config?: RequestConfig): ResponsePromise
  request(config: RequestConfig): ResponsePromise

  get(url: string, config?: RequestConfig): ResponsePromise

  delete(url: string, config?: RequestConfig): ResponsePromise

  head(url: string, config?: RequestConfig): ResponsePromise

  options(url: string, config?: RequestConfig): ResponsePromise

  post(url: string, data?: any, config?: RequestConfig): ResponsePromise

  put(url: string, data?: any, config?: RequestConfig): ResponsePromise

  patch(url: string, data?: any, config?: RequestConfig): ResponsePromise
}

export interface RequestMixin extends RequestInterface {
  (config: RequestConfig): ResponsePromise
  create(config?: any): RequestMixin

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface InterceptorResolvedFn<T> {
  (resolvedData: T): T
}

export interface InterceptorRejectedFn {
  (err: any): any
}

export interface InterceptorInterface<T> {
  resolved: InterceptorResolvedFn<T>
  rejected: InterceptorRejectedFn | undefined
}

export interface InterceptorsControllerInterface<T> {
  use: (resolvedFn: InterceptorResolvedFn<T>, rejectedFn?: InterceptorRejectedFn) => number
  eject: (id: number) => void
}

export interface TransformFunc {
  (data: any, headers?: any): any
}
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

interface RequestAuthorization {
  username: string
  password: string
}

export interface Canceler {
  (message?: string): void
}

export interface CancelerExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelerExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
