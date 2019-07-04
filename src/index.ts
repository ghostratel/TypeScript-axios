import { RequestConfig } from './types/index'
import { URLSerialization } from './helpers/url'
import xhr from './xhr'

function request(config: RequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: RequestConfig): void {
  const { url, params } = config
  config.url = URLSerialization(url, params)
}

export default request
