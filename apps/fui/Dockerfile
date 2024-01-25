# syntax=docker/dockerfile:1.4

FROM node:20.11.0 as builder

WORKDIR /build

COPY /apps/fui ./apps/fui
# meta and misc.
COPY README.md LICENSE .nxignore package.json package-lock.json tsconfig.base.json nx.json .eslintrc.json .eslintignore ./

RUN --mount=type=cache,target=/var/cache/node; \
    npm set cache /var/cache/node; \
    npm ci --no-audit --prefer-offline --fund=false

RUN npx nx run @inmeal/fui:build:production

## SPA static site hosted with nginx

FROM nginx:1.23.4-alpine-slim as nginx-spa

WORKDIR /www/inmeal/

# nx build artifacts

COPY --from=builder /build/dist/apps/fui/ ./

ENV PATH /src/app/node_modules/.bin:$PATH

# copy nginx config
COPY apps/fui/nginx/default.conf /etc/nginx/conf.d/
COPY apps/fui/nginx/mime.types apps/fui/nginx/nginx.conf /etc/nginx/
COPY apps/fui/nginx/proxy/proxy.conf /etc/nginx/includes/

RUN apk add --no-cache su-exec

ENTRYPOINT nginx -g "daemon off;"
