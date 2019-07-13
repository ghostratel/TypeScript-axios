import { Defaults } from './types/index'
import { transformData } from './helpers/data'

/**
 * 试着将请求返回的文本转成JSON
 *
 * @param {string} responseText
 * @returns {*}
 */
function tryToTransformResponseText(responseText: string): any {
  try {
    responseText = JSON.parse(responseText)
  } catch (err) {
    //
  }
  return responseText
}

export const defaults: Defaults = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    },
    get: {},
    delete: {},
    options: {},
    head: {},
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    patch: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    put: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },

  transformRequest: [data => transformData(data)],

  transformResponse: [
    data => {
      return typeof data === 'string' ? tryToTransformResponseText(data) : data
    }
  ]
}
