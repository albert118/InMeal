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
RUN apk update && apk add --no-cache bash wget curl dotnet7-sdk; \
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

COPY apps/ ./apps
COPY libs/ ./libs
# .nxignore seems to be required in the build step
# otherwise the module boundary checker (which is not enabled/configured for dotnet???)
# will see both /dist/app/**/*/project.json as well as app/**/*/project.json
# this causes it to crash violently and screw me for a couple of hours
COPY README.md LICENSE Directory.*.* .nxignore nuget.config package.json package-lock.json tsconfig.base.json nx.json .eslintrc.json .eslintignore .nx-dotnet.rc.json ./

# if this fails for some reason, including the node version can be helpful
RUN node --version && npm ci

RUN ls . && npx nx run-many -t build -c production --parallel=8
RUN npx nx run InMeal.Api:publish --verbose

FROM mcr.microsoft.com/dotnet/aspnet:7.0 as backend-runtime
WORKDIR /app
COPY  /build/dist/apps/InMeal.Api/net7.0/publish ./

FROM nginx:1.23.4-alpine-slim as static-site-host
WORKDIR /www/inmeal/
COPY --from=builder /build/dist/apps/fui/ ./
COPY apps/fui/nginx/default.conf /etc/nginx/conf.d/
COPY apps/fui/nginx/proxy.conf /etc/nginx/includes/
