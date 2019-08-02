import {
  isArray,
  isDate,
  isObject,
  isURLSearchParams,
  isFormData,
  encode,
  deepCopy
} from '../../src/helpers/utils'

describe('helpers:util', () => {
  describe('isXXX', () => {
    test('should validate Array', () => {
      const arrayLike = {
        0: 0,
        1: 1,
        length: 2
      }
      expect(isArray(Array(3))).toBeTruthy()
      expect(isArray(arrayLike)).toBeFalsy()
    })

    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now)).toBeFalsy()
    })

    test('should validate plainObject', () => {
      expect(isObject({ foo: 'bar' })).toBeTruthy()
      expect(isObject(new Date())).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams('?foo=bar&baz=boo'))).toBeTruthy()
      expect(isURLSearchParams('?foo=bar&baz=boo')).toBeFalsy()
    })

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('encode', () => {
      expect(encode("foo=bar[]&baz=$'")).toBe("foo%3Dbar[]%26baz%3D$'")
    })

    test('deepCopy', () => {
      const a = { foo: { baz: 'boo' }, list: [1, 2, 3] }
      const b = deepCopy(a)

      expect(a).toEqual(b)
      expect(a).not.toBe(b)

      expect(b.foo).toEqual({ baz: 'boo' })
      expect(b.foo).not.toBe(a.foo)

      expect(b.list).toEqual([1, 2, 3])
      expect(b.list).not.toBe(a.list)
    })
  })
})
