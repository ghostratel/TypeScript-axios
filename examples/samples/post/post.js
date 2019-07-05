import request from '../../../src/index'

request({
  url: 'http://localhost:9999/post',
  method: 'post',
  data: {
    foo: 'bar'
  }
})

request({
  url: 'http://localhost:9999/post',
  method: 'post',
  data: {
    foo: 'bar',
    a: 1
  },
  headers: {
    'Accept': 'application/json; text/plain;'
  }
})

request({
  url: 'http://localhost:9999/post',
  method: 'post',
  data: new URLSearchParams('https://example.com?foo=1&bar=2')
})



request({
  url: 'http://localhost:9999/post/buffer',
  method: 'post',
  data: {
    foo: new Int32Array([1,2,3,4])
  },
  headers: {
    'Content-Type': 'text/plain; charset=utf-8'
  }
})

