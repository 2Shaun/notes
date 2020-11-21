# Dockerfile Notes

- `docker build "your build context"` reads from the Dockerfile to build an image
  - this is ran under the docker daemon user
the `WORKDIR` defines where various Dockerfile commands will be ran, such as `RUN`, `CMD`, `ADD`, `COPY`, and `ENTRYPOINT`
- files can be excluded from docker stanzas with a `.dockerignore` file
- Dockerfiles begin with the `FROM` stanza to specify the parent image

