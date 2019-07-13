import axios from 'axios'
import qs from 'qs'

console.log(qs.stringify({
  foo: 'bar'
}))

axios({
  url: 'http://localhost:9999/post',
  method: 'post',
  data: qs.stringify({
    foo: 'bar'
  })
}).then(data => {
  console.log(data);
})
