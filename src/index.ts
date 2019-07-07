import { RequestMixins } from './types/index'
import Request from './core/request'

function createRequestMixins(): RequestMixins {
  const requestInstance: Request = new Request()
  const mixins: any = requestInstance.request.bind(requestInstance)

  for (let key in requestInstance) {
    mixins[key] = requestInstance[key]
  }

  return mixins
}

export default createRequestMixins()
