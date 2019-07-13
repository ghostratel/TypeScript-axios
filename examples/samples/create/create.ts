import request from '../../../src/index'

let instance = request.create({
  headers: {
    xxx: 'xxxx',
  }
})

instance.defaults.headers.post['yyy'] = 'yyy'

instance({
  url: 'http://localhost:9999/get',
  params: {
    foo: 'bar'
  }
})

instance.post('http://localhost:9999/post', {
  baz: 'boo'
})
