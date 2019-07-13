import { RequestMixin, Defaults, RequestConfig } from './types/index'
import { mergeConf } from './helpers/merge'
import Request from './core/request'
import { defaults } from './defaults'

function createRequestMixin(config: Defaults): RequestMixin {
  const requestInstance: Request = new Request(config)
  const mixin: any = requestInstance.request.bind(requestInstance)

  for (let key in requestInstance) {
    mixin[key] = requestInstance[key]
  }

  return mixin
}

const request = createRequestMixin(defaults)

request.create = function(config?: Defaults) {
  if (!config) {
    config = {} as Defaults
  }
  return createRequestMixin(mergeConf(defaults, config as RequestConfig) as Defaults)
}

export default request
