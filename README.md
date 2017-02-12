docker build -t reactive-client .
docker run --name reactive-client -d  reactive-client:latest -p 8089:80