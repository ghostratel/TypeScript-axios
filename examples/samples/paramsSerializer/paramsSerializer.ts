import request from '../../../src/index'
import qs from 'qs'

request.get('http://localhost:9999/get', {
  params: new URLSearchParams('a=b&x=y')
})

request.get('http://localhost:9999/get', {
  params: {
    a: 1,
    b: 2,
    c: [3,2,1]
  }
})

const i = request.create({
  paramsSerializer: params => {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  }
})

i.get('http://localhost:9999/get', {
  params: {
    a: 1,
    b: 2,
    c: [3,2,1]
  }
})
