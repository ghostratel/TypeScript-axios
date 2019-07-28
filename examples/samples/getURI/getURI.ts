import request from '../../../src/index'

console.log(request.getURI({
  url: 'http://localhost:9999/get/',
  params: {
    id: 9527
  }
}))

console.log(request.getURI({
  baseURL: 'http://localhost:9999',
  url: 'get/?name=Griffin',
  params: {
    id: 9527
  }
}))


function getName(){
  return request.get('http://localhost:9999/get/?name=griffin')
}

function getID(){
  return request.get('http://localhost:9999/get/?id=9527')
}

request.all([getName(), getID()]).then(([name, id]) => {
  console.log(name, id)
})
