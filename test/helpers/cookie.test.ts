import { cookie } from '../../src/helpers/cookie'

describe('helper:cookie', () => {
  test('read cookie', () => {
    document.cookie = 'foo=bar'
    expect(cookie.read('foo')).toBe('bar')
  })

  test('should return null if cookie name does not exit', () => {
    document.cookie = 'foo=bar'
    expect(cookie.read('baz')).toBeNull()
  })
})
