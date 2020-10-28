FROM node:14.14.0-alpine3.10

ENV NODE_ENV="production"
ENV STATIC_DATA_PATH="/var/www/html/images/"

RUN mkdir /server \
    && mkdir -p ${STATIC_DATA_PATH}

WORKDIR /server

COPY . .

RUN npm install -g sequelize-cli
RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]
