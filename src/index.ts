import { RequestConfig } from './types/index'
import xhr from './xhr'

function request(config: RequestConfig): void {
  xhr(config)
}

export default request
