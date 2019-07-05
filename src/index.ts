import { RequestConfig, ResponsePromise } from './types/index'
import { URLSerialization } from './helpers/url'
import { transformData } from './helpers/data'
import { processRequestHeaders } from './helpers/headers'
import xhr from './xhr'

function request(config: RequestConfig): ResponsePromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: RequestConfig): void {
  const { url, params, data, headers } = config
  config.url = URLSerialization(url, params)
  config.headers = processRequestHeaders(headers, data)
  config.data = transformData(data)
}

export default request
