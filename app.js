const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT | 3000

const Docker = require('dockerode')
const docker = new Docker()

//Containers

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

app.post('/containers/:containerId/stop', (req, res) => {
  const containerId = req.params.containerId

  const container = docker.getContainer(containerId)
  container.stop()
    .then(result => {
      res.status(204).send()
    })
})

app.post('/containers/:containerId/start', (req, res) => {
  const containerId = req.params.containerId

  const container = docker.getContainer(containerId)
  container.start()
    .then(result => {
      res.status(204).send()
    })
})

app.delete('/containers/:containerId', (req, res) => {
  const containerId = req.params.containerId

  const container = docker.getContainer(containerId)
  container.remove()
    .then(result => {
      res.status(204).send()
    })
})

//Images
app.get('/images', (req, res) => {
  docker.listImages()
        .then(images =>  res.json({"images": images}))
})

app.get('/images/:imageId', (req, res) => {
  const imageId = req.params.imageId

  const image = docker.getImage(imageId)
  image.inspect()
    .then(inspectInfo => {
      res.json(inspectInfo)
    })
  
})

app.delete('/images/:imageId', (req, res) => {
  const imageId = req.params.imageId

  const image = docker.getImage(imageId)
  image.remove()
    .then(result => {
      res.status(204).send()
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})