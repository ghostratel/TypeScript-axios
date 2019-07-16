import request from '../../../src/index'


const i = request.create({
  withCredentials: true,
  xsrfCookieName: 'xxx-xsrf-xxx',
  xsrfHeaderName: 'xxx-xsrf-heaer-xxx'
})

i.get('http://localhost:9999/xsrf')

