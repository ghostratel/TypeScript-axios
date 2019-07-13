import axios from 'axios'

axios({
  url: 'http://localhost:9999/get',
  responseType: 'json',
  params: {
    foo: 'bar'
  },
  transformResponse: [
    function (data) {
      console.log(data)
      data.xxx ='xxx'
      return data
    }
  ]
}).then(data => {
  console.log(data);
})
