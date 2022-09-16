const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT | 3000

const Docker = require('dockerode')
const docker = new Docker()

app.get('/container', (req, res) => {
  docker.listContainers({all: true})
        .then(containers =>  res.json({"containers": containers}))
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})