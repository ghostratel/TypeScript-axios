import request from '../../../src/index'

request.interceptors.request.use(config => {
  console.log(1)
  return config
})

request.interceptors.request.use(config => {
  console.log(2)
  return config
})

request.interceptors.response.use(data => {
  console.log(3)
  return data
})

request.interceptors.response.use(data => {
  console.log(4)
  return data
})

request.get('http://localhost:9999/get?foo=bar')

// 2 => 1 => 3 => 4
