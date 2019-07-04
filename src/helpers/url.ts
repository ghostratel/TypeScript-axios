import { isArray, encode, isDate, isObject } from './utils'

export default function URLSerialization(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const values = []
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let value = params[key]
      if (value === null || value === undefined) {
        continue
      }

      if (isArray(value)) {
        key += '[]'
        values.push(...value.map(v => `${encode(key)}=${encode(v)}`))
        continue
      }

      if (isObject(value)) {
        values.push(`${key}=${encode(JSON.stringify(value))}`)
        continue
      }

      if (isDate(value)) {
        values.push(`${key}=${value.toISOString()}`)
        continue
      }

      values.push(`${key}=${value}`)
    }
  }

  const hashIndex = url.indexOf('#')
  url = hashIndex === -1 ? url : url.slice(0, hashIndex)
  url.includes('?') ? (url += '&') : (url += '?')
  url += values.join('&')
  return url
}
