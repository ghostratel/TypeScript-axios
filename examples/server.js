const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({
    msg: 'Hello world!'
  })
})


app.get('/get', (req, res) => {
  res.json({
    msg: 'Test get method'
  })
})


app.listen(9999, () => {
  console.log('API server is running at port 9999.')
})
