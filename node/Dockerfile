FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install && \
  npm install mysql2 --save

RUN apk --no-cache add bash
RUN wget -O /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
RUN cp /usr/local/bin/wait-for-it.sh /usr/src/app

COPY ./index.js ./

VOLUME /node

CMD ["npm","start"]