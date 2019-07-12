import { Defaults } from './types/index'

export const defaults: Defaults = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      accept: 'application/json, text/plain, */*'
    },
    get: {},
    delete: {},
    options: {},
    head: {},
    post: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    patch: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    put: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
}
