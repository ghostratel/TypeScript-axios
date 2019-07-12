import request from '../../../src/index'


request.defaults.headers.common['xxx'] = 'xxx'

request.defaults.headers.get['yyy'] = 'yyy'

request.defaults.headers.post['666'] = 666

request.get('http://localhost:9999/get?foo=bar', {
  headers: {
    zzz: 'zzz'
  }
})

request({
  url: 'http://localhost:9999/post',
  method:'post',
  data: {
    foo: 'bar'
  }
})

