import { isObject } from '../helpers/utils'

export function transformData(data: any): any {
  return isObject(data) ? JSON.stringify(data) : data
}
