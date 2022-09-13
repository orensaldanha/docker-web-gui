const express = require('express')
const app = express()
const port = process.env.port | 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/json', (req, res) => {
  res.json(req.query);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})