import {
  isAbsoluteURL,
  isCrossOrigin,
  URLSerialization,
  resolveURL,
  combineURLs
} from '../../src/helpers/url'

describe('helpers::isAbsoluteURL', function() {
  it('should return true if URL begins with valid scheme name', function() {
    expect(isAbsoluteURL('https://api.github.com/users')).toBe(true)
    expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBe(true)
    expect(isAbsoluteURL('HTTP://example.com/')).toBe(true)
  })

  it('should return false if URL begins with invalid scheme name', function() {
    expect(isAbsoluteURL('123://example.com/')).toBe(false)
    expect(isAbsoluteURL('!valid://example.com/')).toBe(false)
  })

  it('should return true if URL is protocol-relative', function() {
    expect(isAbsoluteURL('//example.com/')).toBe(true)
  })

  it('should return false if URL is relative', function() {
    expect(isAbsoluteURL('/foo')).toBe(false)
    expect(isAbsoluteURL('foo')).toBe(false)
  })
})

describe('helpers::isURLSameOrigin', function() {
  it('should detect same origin', function() {
    expect(isCrossOrigin(window.location.href)).toEqual(true)
  })

  it('should detect different origin', function() {
    expect(isCrossOrigin('https://github.com/axios/axios')).toEqual(false)
  })
})

describe('helpers::URLSerialization', function() {
  it('should support null params', function() {
    expect(URLSerialization('/foo')).toEqual('/foo')
  })

  it('should support params', function() {
    expect(
      URLSerialization('/foo', {
        foo: 'bar'
      })
    ).toEqual('/foo?foo=bar')
  })

  it('should support object params', function() {
    expect(
      URLSerialization('/foo', {
        foo: {
          bar: 'baz'
        }
      })
    ).toEqual('/foo?foo=' + encodeURI('{"bar":"baz"}'))
  })

  it('should support date params', function() {
    const date = new Date()

    expect(
      URLSerialization('/foo', {
        date: date
      })
    ).toEqual('/foo?date=' + date.toISOString())
  })

  it('should support array params', function() {
    expect(
      URLSerialization('/foo', {
        foo: ['bar', 'baz']
      })
    ).toEqual('/foo?foo[]=bar&foo[]=baz')
  })

  it('should support special char params', function() {
    expect(
      URLSerialization('/foo', {
        foo: '@:$, '
      })
    ).toEqual('/foo?foo=@:$,+')
  })

  it('should support existing params', function() {
    expect(
      URLSerialization('/foo?foo=bar', {
        bar: 'baz'
      })
    ).toEqual('/foo?foo=bar&bar=baz')
  })

  it('should support "length" parameter', function() {
    expect(
      URLSerialization('/foo', {
        query: 'bar',
        start: 0,
        length: 5
      })
    ).toEqual('/foo?query=bar&start=0&length=5')
  })

  it('should correct discard url hash mark', function() {
    expect(
      URLSerialization('/foo?foo=bar#hash', {
        query: 'baz'
      })
    ).toEqual('/foo?foo=bar&query=baz')
  })

  it('should support URLSearchParams', function() {
    expect(URLSerialization('/foo', new URLSearchParams('bar=baz'))).toEqual('/foo?bar=baz')
  })
})

describe('helper::resolveURL', () => {
  it('should resolve host and protocol', () => {
    expect(resolveURL('https://github.com/axios/axios')).toEqual({
      protocol: 'https:',
      host: 'github.com'
    })
    expect(resolveURL('http://github.com/axios/axios')).toEqual({
      protocol: 'http:',
      host: 'github.com'
    })
  })
})

describe('helpers::combineURLs', function() {
  it('should combine URLs', function() {
    expect(combineURLs('https://api.github.com', '/users')).toBe('https://api.github.com/users')
  })

  it('should remove duplicate slashes', function() {
    expect(combineURLs('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
  })

  it('should insert missing slash', function() {
    expect(combineURLs('https://api.github.com', 'users')).toBe('https://api.github.com/users')
  })

  it('should not insert slash when relative url missing/empty', function() {
    expect(combineURLs('https://api.github.com/users', '')).toBe('https://api.github.com/users')
  })

  it('should allow a single slash for relative url', function() {
    expect(combineURLs('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
  })
})
