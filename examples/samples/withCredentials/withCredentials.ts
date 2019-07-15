import request from '../../../src/index'

request({
  url: 'http://localhost:9999/cookie/post',
  method: 'post',
  withCredentials: true
})

request({
  url: 'http://localhost:9999/cookie/post',
  method: 'post',
  withCredentials: false
})
