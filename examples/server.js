const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')
const multiparty = require('connect-multiparty')
const path = require('path')
const atob = require('atob')
const app = express()

app.use(cors({origin: 'http://127.0.0.1:8888',credentials: true}))
app.use(cookie())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(multiparty({
  uploadDir: path.resolve(__dirname, 'upload-dir')
}))

app.get('/', (req, res) => {
  res.send('Hello world!')
})


app.get('/get', (req, res) => {
  res.json(req.query)
})


app.post('/post', (req, res) => {
  res.json(req.body)
})

app.post('/post/buffer', (req, res) => {
  let r = ''
  req.on('data', chunk => {
    r += chunk
  })
  req.on('end', () => {
    res.send(r)
  })
})

app.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({msg: '5000ms timeout'})
  }, 5000)
})

app.get('/cancel/get', (req, res) => {
  setTimeout(() => {
    res.json('Hello!!!')
  }, 3000)
})

app.post('/cookie/post', (req, res) => {
  res.cookie('foo', 'bar')
  res.json(req.cookies)
})

app.get('/xsrf', (req, res) => {
  console.log(req.cookies)
  res.cookie('xxx-xsrf-xxx', 'foobarbazboo')
  res.json({msg: 'hello'})
})

app.post('/upload', (req, res) => {
  res.json({msg: 'hello'})
})

app.post('/auth', (req, res) => {
  const value = req.headers['authorization'].split(' ')[1]
  const [username, password] = atob(value).split(':')
  if(username === 'ghost' && password === '123456') {
    res.json(req.body)
  } else {
    res.status(401)
    res.send('UnAuthorization')
  }
})

app.listen(9999, () => {
  console.log('API server is running at port 9999.')
})
