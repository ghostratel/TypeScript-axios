import request from '../../../src/index'


request({
  url: 'http://localhost:9999/auth',
  method: 'post',
  data: {
    foo: 'bar'
  },
  auth: {
    username: 'ghost',
    password: '123456'
  }
})

request({
  url: 'http://localhost:9999/auth',
  method: 'post',
  data: {
    foo: 'bar'
  },
  auth: {
    username: 'ghost',
    password: 'wrongpassword'
  }
})
