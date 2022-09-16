const Docker = require('dockerode');

var docker = new Docker();

docker.version()
      .then(res => console.log(res))