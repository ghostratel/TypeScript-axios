import request from '../../../src/index'

request.get('http://localhost:9999/validateStatus').catch(err => console.log(err))

request.get('http://localhost:9999/validateStatus', {
  validateStatus(status: number){
    return status >= 200 && status < 400
  }
}).then(data => console.log(data))
