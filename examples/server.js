const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

app.listen(9999, () => {
  console.log('API server is running at port 9999.')
})
