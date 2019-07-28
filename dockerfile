# Stage 0 grab most optimized version build for production

FROM node:10.16.0-alpine as build-stage

RUN mkdir -p /app/rod-tile-client
WORKDIR /app/rod-tile-client

COPY package.json /app/rod-tile-client
COPY package-lock.json /app/rod-tile-client

RUN npm install

COPY . /app/rod-tile-client


# set environment variables
ARG REACT_APP_API_URI
ENV REACT_APP_API_URI $REACT_APP_API_URI

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:1.14

COPY --from=build-stage /app/rod-tile-client/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]