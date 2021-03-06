[![Build Status](https://travis-ci.org/jluccisano/reactive-client.svg?branch=master)](https://travis-ci.org/jluccisano/reactive-client)

### Architecture overview

[![Architecture Overview](https://jluccisano.github.io/assets/images/consume-data-from-reactive-client.png)


### Prerequisites
docker
npm
gulp

```bash
npm install gulp -g 
npm install gulp-cli -g 
npm install
```


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

