import request from '../../../src/index'

request.get('http://localhost:9999/get?foo=bar')

request.request('http://localhost:9999/get?foo=bar')

request.post('http://localhost:9999/post', {foo: 'bar'})

request.post('http://localhost:9999/post', {foo: 'bar'}, {headers: {'XXX-FOO-XXX': 'XXX-BAR-XXX'}})

request.request('http://localhost:9999/post', {
  method: 'POST',
  data: {
    msg: 'xxxx'
  }
})
