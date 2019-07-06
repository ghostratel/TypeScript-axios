import request from '../../../src/index'

request({
  url: 'http://localhost:9999/error/wrongAPI',
  method: 'GET'
}).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
})


request({
  url: 'http://localhost:9999/error/timeout',
  method: 'GET',
  timeout: 1000
}).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
})
