import { RequestConfig } from './types/index'
import { URLSerialization } from './helpers/url'
import { transformData } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

function request(config: RequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: RequestConfig): void {
  const { url, params, data, headers } = config
  config.url = URLSerialization(url, params)
  config.headers = processHeaders(headers, data)
  config.data = transformData(data)
}

export default request
