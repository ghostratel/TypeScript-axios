import request from '../../../src/index'

request({
  url: 'http://localhost:9999/post',
  method: 'post',
  data: {
    foo: 'bar'
  }
})



request({
  url: 'http://localhost:9999/post/buffer',
  method: 'post',
  data: {
    foo: new Int32Array([1,2,3,4])
  }
})
