import request from '../../../src/index'

const i = request.create({
  baseURL: '//img.mukewang.com'
})


i.get('/5cc54ac10001086318720632.jpg')

i.get('//img.mukewang.com/5d390bdd00012a1f09360316.jpg')
