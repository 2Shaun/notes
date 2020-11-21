# [Volumes](https://docs.docker.com/storage/volumes/)

used for container data persistence

- `/var/run/docker.sock` is the UNIX socket that the Docker daemon is listening to
  - this is similar to a network socket but for the kernel
  - by setting the `nginx-proxy` volume to `/var/run/docker.sock`, nginx will know when containers (set with `VIRTUAL_HOST="your domain name"`) are created

## Hosting multiple websites using nginx reverse proxy

1. run `docker network create nginx-proxy-net` with default bridge network settings
2. run `docker run -d -p 80:80 --name nginx-proxy --net nginx-proxy-net -v /var/run/docker.sock:/tmp/docker.sock jwilder/nginx-proxy`

- this allows the `nginx-proxy` container to listen for when other containers are created and forward requests on port 80 of the host to port 80 of the `nginx-proxy` container to be routed to an exposed port 80 on these newly created containers

3. in the `build` folder of your website, create a `Dockerfile` with the following contents

```
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

to serve the directory

4. build the docker image in the build directory with `docker build -t html-server-image:v1 .`

- the `.` tells docker to build from the created `Dockerfile`
