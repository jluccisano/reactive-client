FROM nginx
RUN apt-get update \
  && apt-get -y install zip
ADD reactive-client.zip /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN unzip -o reactive-client.zip \
  && rm reactive-client.zip