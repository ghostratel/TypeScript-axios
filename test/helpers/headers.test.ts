import {
  normalizeHeadersName,
  flattenHeaders,
  processResponseHeaders,
  processRequestHeaders
} from '../../src/helpers/headers'

describe('helper: headers', () => {
  test('normalizeHeadersName', () => {
    const header = {
      'conTent-tYpe': 'application/json;charset=utf-8',
      AccEpt: 'text/html',
      foo: 'bar'
    }

    normalizeHeadersName(header, 'Content-Type')
    normalizeHeadersName(header, 'Accept')

    expect(header['Content-Type']).toBe('application/json;charset=utf-8')
    expect(header['Accept']).toBe('text/html')
    expect(header['conTent-tYpe']).toBeUndefined()
    expect(header['AccEpt']).toBeUndefined()
    expect(header['foo']).toBe('bar')
  })

  test('flattenHeaders', () => {
    const header = {
      common: {
        Accept: 'application/json, text/plain, */*'
      },
      post: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      get: {
        'X-GET-HEADER': 'GET-HEADERS'
      }
    }

    expect(flattenHeaders(JSON.parse(JSON.stringify(header)), 'get')).toEqual({
      Accept: 'application/json, text/plain, */*',
      'X-GET-HEADER': 'GET-HEADERS'
    })
    expect(flattenHeaders(JSON.parse(JSON.stringify(header)), 'post')).toEqual({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })

  test('processResponseHeaders', () => {
    const header =
      'Cache-Control: private, max-age=0, no-cache\r\n' +
      'Content-Length: 43\r\n' +
      'Content-Type: image/gif\r\n' +
      'Date: Sat, 03 Aug 2019 14:23:49 GMT\r\n' +
      'Pragma: no-cache\r\n' +
      'Server: apache\r\n' +
      ': bazboo\r\n' +
      'foo: \r\n' +
      'Strict-Transport-Security: max-age=172800\r\n' +
      'X-Content-Type-Options: nosniff'

    const processedHeaders = processResponseHeaders(header)

    expect(processedHeaders['Cache-Control']).toBe('private, max-age=0, no-cache')
    expect(processedHeaders['Content-Type']).toBe('image/gif')
    expect(processedHeaders['Date']).toBe('Sat, 03 Aug 2019 14:23:49 GMT')
    expect(processedHeaders['Pragma']).toBe('no-cache')
    expect(processedHeaders['Server']).toBe('apache')
    expect(processedHeaders['foo']).toBe('')
    expect(processedHeaders['Strict-Transport-Security']).toBe('max-age=172800')
    expect(processedHeaders['X-Content-Type-Options']).toBe('nosniff')
  })

  test('processRequestHeaders', () => {
    const header = {
      'cOnTent-TypE': 'application/x-www-form-urlencoded',
      AcCEpt: 'text/html',
      common: {
        'x-common': 'common-header'
      },
      get: {
        'x-get': 'get-header'
      },
      post: {
        'x-post': 'post-header'
      }
    }

    processRequestHeaders(header, 'post')

    expect(header['Content-Type']).toBe('application/x-www-form-urlencoded')
    expect(header['Accept']).toBe('text/html')
    expect(header['x-common']).toBe('common-header')
    expect(header['get']).toBeUndefined()
    expect(header['x-post']).toBe('post-header')
    expect(header['post']).toBeUndefined()
    expect(header['common']).toBeUndefined()
  })
})
