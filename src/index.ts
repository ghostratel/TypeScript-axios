import { RequestMixin, RequestConfig } from './types/index'
import { mergeConf } from './helpers/merge'
import Request from './core/request'
import { defaults } from './defaults'
import { CancelToken } from './cancel/CancelToken'
import { Cancel, isCancel } from './cancel/Cancel'

function createRequestMixin(config: RequestConfig): RequestMixin {
  const requestInstance: Request = new Request(config)
  const mixin: any = requestInstance.request.bind(requestInstance)

  for (let key in requestInstance) {
    mixin[key] = requestInstance[key]
  }

  return mixin
}

const request = createRequestMixin(defaults)

request.create = function(config?: RequestConfig) {
  if (!config) {
    config = {} as RequestConfig
  }
  return createRequestMixin(mergeConf(defaults, config as RequestConfig) as RequestConfig)
}

request.CancelToken = CancelToken
request.Cancel = Cancel
request.isCancel = isCancel
request.all = function(promises) {
  return Promise.all(promises)
}
request.spread = function(callback) {
  return function(arr) {
    return callback.apply(null, arr)
  }
}

export default request
