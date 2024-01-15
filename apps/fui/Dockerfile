# syntax=docker/dockerfile:1.4

## SPA static site hosted with nginx

FROM nginx:1.23.4-alpine-slim as nginx-spa

WORKDIR /www/inmeal/

# nx build artifacts (nx generates package.json for us - not that we need it here but I've done it now)

COPY /dist/apps/fui/ ./

ENV PATH /src/app/node_modules/.bin:$PATH

# copy nginx config

COPY apps/fui/nginx/default.conf /etc/nginx/conf.d/
COPY apps/fui/nginx/proxy.conf /etc/nginx/includes/
