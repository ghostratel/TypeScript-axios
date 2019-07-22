import { RequestConfig } from '../types/index'
import { isObject, deepCopy } from '../helpers/utils'

const fieldsOverwriteByUserConf = ['data', 'params', 'method', 'url', 'auth']
const fieldsNeedToBeDeepMerged = ['headers']

export function mergeConf(defaultConf: RequestConfig, userConf: RequestConfig): RequestConfig {
  const config = deepCopy(defaultConf)

  for (let key in userConf) {
    if (fieldsOverwriteByUserConf.includes(key)) {
      config[key] = userConf[key]
      continue
    }
    if (fieldsNeedToBeDeepMerged.includes(key)) {
      if (isObject(userConf[key])) {
        for (let _key in userConf[key]) {
          config[key][_key] = config[key][_key] || userConf[key][_key]
        }
      }
      continue
    }
    config[key] = userConf[key]
  }

  config.method = config.method.toLowerCase()

  return config as RequestConfig
}
