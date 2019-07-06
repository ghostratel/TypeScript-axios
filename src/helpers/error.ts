import { RequestErrorInterface, RequestConfig, Response } from '../types/index'

export class RequestError extends Error implements RequestErrorInterface {
  config: RequestConfig
  code: number | null
  request: XMLHttpRequest
  response: Response | null
  constructor(
    message: string,
    config: RequestConfig,
    code: number | null = null,
    request: XMLHttpRequest,
    response: Response | null = null
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    Object.setPrototypeOf(this, Error.prototype)
  }
}
