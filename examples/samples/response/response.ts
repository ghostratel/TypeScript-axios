import request from '../../../src/index'

request({
  url: 'http://localhost:9999/post',
  method: 'post',
  data: {
    a: 1,
    msg: 'xswl'
  }
}).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err)
})
