###########
# DEV FILE #
###########

FROM node:10.16.0-alpine

RUN mkdir -p /app/rod-tile-client
WORKDIR /app/rod-tile-client

COPY package.json /app/rod-tile-client
COPY package-lock.json /app/rod-tile-client

RUN npm install

COPY . /app/rod-tile-client

CMD ["npm", "start"]