import { Defaults, RequestConfig } from '../types/index'
import { isObject } from '../helpers/utils'

function defaultMerge<T>(defaultConf: any, userConf: any): any {
  return userConf ? userConf : defaultConf
}

function userConfMerge(defaultConf: any, userConf: any): any {
  return userConf
}

function confDeepMerge(defaultConf: any, userConf: any): any {
  if (isObject(userConf)) {
    return deepMerge(defaultConf, userConf)
  } else if (typeof userConf !== 'undefined') {
    return userConf
  } else if (isObject(defaultConf)) {
    return deepMerge(defaultConf)
  } else if (typeof defaultConf !== 'undefined') {
    return defaultConf
  }
}

function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (isObject(val)) {
        if (isObject(result[key])) {
          result[key] = deepMerge(result[key], val)
        } else {
          result[key] = deepMerge(val)
        }
      } else {
        result[key] = val
      }
    })
  })

  return result
}

const mergeConfMap: any = {}

const userConfList = ['data', 'params', 'url']

userConfList.forEach(key => {
  mergeConfMap[key] = userConfMerge
})

const deepMergeConfList = ['headers']

deepMergeConfList.forEach(key => {
  mergeConfMap[key] = confDeepMerge
})

export function mergeConf(defaultConf: Defaults, userConf: any = {}): RequestConfig {
  const config = Object.create(null)

  for (let key in defaultConf) {
    config[key] = defaultConf[key]
  }

  for (let key in userConf) {
    const merge = mergeConfMap[key] || defaultMerge
    config[key] = merge(defaultConf[key], userConf[key])
  }

  return config
}
