# syntax=docker/dockerfile:1.4

# https://hub.docker.com/_/alpine
FROM alpine:3.19 as builder

WORKDIR /build

# using NVM instead of install nodejs through apk
ENV NVM_DIR $HOME/build
ENV NVM_VERSION 0.39.7
ENV NODE_VERSION 20.11.0
ENV NVM_NODEJS_ORG_MIRROR https://unofficial-builds.nodejs.org/download/release
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# setup so that we can use bash and download a few dependencies
RUN apk update && apk add --no-cache bash wget curl; \
    touch $HOME/.profile; \
    echo 'nvm_get_arch() { nvm_echo "x64-musl"; }' >> $HOME/.profile;

# https://github.com/nvm-sh/nvm/issues/1102#issuecomment-591560924
# we require libstdc++ for building Node ourselves - if only this was baked to support Alpine already...
RUN apk add curl libstdc++; \
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash; \
    source $NVM_DIR/nvm.sh; \
    nvm install $NODE_VERSION; \
    nvm alias default $NODE_VERSION; \
    nvm use default

# copy the source code
COPY nx.json tsconfig.base.json package.json package-lock.json libs/ apps/ ./
COPY LICENSE README.md ./
COPY Directory.*.* .nx-dotnet.rc.json nuget.config ./

# if this fails for some reason, including the node version can be helpful
RUN node --version && npm ci

RUN apk add --no-cache dotnet7-sdk;

# manually restore the packages, otherwise they don't as expected...
RUN npx nx build:production

FROM mcr.microsoft.com/dotnet/aspnet:7.0 as backend-runtime

WORKDIR /app

# published dotnet artifacts
COPY  /build/dist/apps/InMeal.Api/net7.0/publish ./

FROM nginx:1.23.4-alpine-slim as static-site-host

WORKDIR /www/inmeal/

# built vite artifacts
COPY --from=builder /dist/apps/fui/ ./

# nginx config
COPY apps/fui/nginx/default.conf /etc/nginx/conf.d/
COPY apps/fui/nginx/proxy.conf /etc/nginx/includes/
