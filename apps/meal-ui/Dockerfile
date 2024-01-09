# syntax=docker/dockerfile:1.4

## SPA static site hosted with nginx

FROM node:18-alpine as spa-builder

# make a working directory for the SPA builder
WORKDIR /src

# copy config
COPY package.json package-lock.json ./

# install deps
RUN apk add --no-cache --update python3 make g++ && rm -rf /var/cache/apk/*
# RUN npm install --production
RUN npm ci

ENV PATH /src/app/node_modules/.bin:$PATH

COPY . .

# executes vite build
RUN npm run prod:build

FROM nginx:1.23.4-alpine-slim as nginx-spa

# copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/proxy.conf /etc/nginx/includes/

# copy the SPA app
RUN mkdir -p /www/inmeal
COPY --from=spa-builder /src/dist /www/inmeal/
