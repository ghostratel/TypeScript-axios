import request from '../../../src/index'

request.defaults.headers.common['xxx'] = 'xxxx'

request.defaults.headers.get['yyy'] = 'yyyy'

request({
  url: 'http://localhost:9999/get?id=45',
  params: {
    foo: 'bar'
  },
  headers: {
    zzz: 'zzzz',
  }
})
