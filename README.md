# Docker Web GUI

A web application that provides an alternative to the docker cli to interact with the docker engine.
This project uses the [Dockerode](https://github.com/apocas/dockerode "Dockerode") package to interact with the docker engine

Supports some of the basic docker interactions like:
* Displaying all containers
* Inspecting a container
* Starting a container
* Stopping a container
* Removing a container
* Displaying all images
* Inspecting an image
* Removing an image
* Displaying all volumes
* Removing volumes

## Screenshots
![Dashboard](https://user-images.githubusercontent.com/36854536/192742671-a65bd9d2-8234-442c-98ad-961e17e2b384.png)
![Containers](https://user-images.githubusercontent.com/36854536/192742678-f7f52d69-d9e0-48f3-9ec6-9d2e120443cb.png)
![Container](https://user-images.githubusercontent.com/36854536/192742686-e1904e80-101a-48be-95df-e2a4753453d4.png)


## Software Tools Used 

* Docker
* Node JS
* Express
* React
* [Dockerode](https://github.com/apocas/dockerode "Dockerode")

## Instructions

* [add user to docker group](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user "add user to docker group")
* ``` npm run start```
* ``` cd frontend && npm run start ```