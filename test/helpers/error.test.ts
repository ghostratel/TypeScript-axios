import { RequestError } from '../../src/helpers/error'
import { RequestConfig, Response } from '../../src/types/index'

describe('helper: error', () => {
  test('create request error', () => {
    const request = new XMLHttpRequest()
    const config: RequestConfig = { method: 'post' }
    const response: Response = {
      data: { foo: 'bar' },
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config
    }

    const err = new RequestError('Test error!', config, 200, request, response)

    expect(err.message).toBe('Test error!')
    expect(err.config).toEqual(config)
    expect(err.code).toBe(200)
    expect(err.request).toEqual(request)
    expect(err.response).toEqual(response)
  })
})
