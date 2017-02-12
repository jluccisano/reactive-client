[![Build Status](https://travis-ci.org/jluccisano/reactive-client.svg?branch=master)](https://travis-ci.org/jluccisano/reactive-client)


### Prerequisites
docker
npm
gulp

### Build
```bash
gulp build
```

### Run 
```bash
gulp serve
```

### Docker

##### build image
```bash
gulp docker:build
```
or
```bash
docker build -t jluccisano/reactive-client:1.0 ./docker
```
##### run image

```bash
docker run --name reactive-client -d  reactive-client:latest -p 8089:80
```

