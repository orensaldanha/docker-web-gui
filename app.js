const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT | 3000

const Docker = require('dockerode')
const docker = new Docker()

app.get('/containers', (req, res) => {
  docker.listContainers({all: true})
        .then(containers =>  res.json({"containers": containers}))
})

app.get('/containers/:containerName', (req, res) => {
  const containerName = "/" + req.params.containerName
  
  docker.listContainers({all: true})
        .then(containers => {
          const containerInfo = containers.find((container) => container.Names[0] === containerName)
          const container = docker.getContainer(containerInfo.Id)
          container.inspect()
            .then(inspectInfo => {
              res.json(inspectInfo)
            })
        })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})