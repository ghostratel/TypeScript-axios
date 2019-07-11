import { RequestMixins } from './types/index'
import Request from './core/request'
import { defaults } from './defaults'

function createRequestMixins(): RequestMixins {
  const requestInstance: Request = new Request(defaults)
  const mixins: any = requestInstance.request.bind(requestInstance)

  for (let key in requestInstance) {
    mixins[key] = requestInstance[key]
  }

  return mixins
}

export default createRequestMixins()
