# syntax=docker/dockerfile:1.4

## SPA static site hosted with nginx

FROM nginx:1.23.4-alpine-slim as nginx-spa

WORKDIR /www/inmeal/

# nx build artifacts (nx generates package.json for us)

COPY /dist/apps/fui/ ./

# TODO:
# RUN apk add --no-cache --update python3 make g++ && rm -rf /var/cache/apk/*
# RUN npm ci

ENV PATH /src/app/node_modules/.bin:$PATH

# copy nginx config

COPY apps/fui/nginx/default.conf /etc/nginx/conf.d/
COPY apps/fui/nginx/proxy.conf /etc/nginx/includes/
