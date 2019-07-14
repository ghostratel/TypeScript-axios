import request from '../../../src/index'
const {CancelToken} = request
const source = CancelToken.source()

request.get('http://localhost:9999/cancel/get', {
  cancelToken: source.token
}).catch(err => {
  if(request.isCancel(err)) {
    console.log('Request canceled', err.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by user')
  request.get('http://localhost:9999/cancel/get?foo=bar', {cancelToken: source.token}).catch(err => {
    if(request.isCancel(err)){console.log('request canceled')}
  })
}, 100);

let cancel:any

request.get('http://localhost:9999/cancel/get?baz=boo', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(err => {
  if(request.isCancel(err)) {
    console.log('request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 100);
