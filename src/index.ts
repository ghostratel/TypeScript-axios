import { RequestConfig } from './types/index'
import URLSerialization from './helpers/url'
import xhr from './xhr'

function request(config: RequestConfig): void {
  config.url = URLSerialization(config.url, config.params)
  xhr(config)
}

export default request
