import { Defaults } from './types/index'

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
  }
}
