import { transformData } from '../../src/helpers/data'

describe('helper:data', () => {
  test('should transform data if argument is plain object', () => {
    expect(transformData({ foo: 'bar' })).toBe('{"foo":"bar"}')
  })

  test('should not transform data if argument is not plain object', () => {
    const data = new URLSearchParams('foo=bar')
    expect(transformData(data)).toBe(data)
  })
})
