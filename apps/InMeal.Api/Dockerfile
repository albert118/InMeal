FROM mcr.microsoft.com/dotnet/sdk:7.0 AS builder

WORKDIR /build

COPY /apps/Configuration ./apps/Configuration
COPY /apps/InMeal.Api ./apps/InMeal.Api
COPY /apps/InMeal.Infrastructure ./apps/InMeal.Infrastructure
COPY /apps/InMeal.Core ./apps/InMeal.Core

# meta and misc.
COPY README.md LICENSE .nxignore package.json package-lock.json tsconfig.base.json nx.json .eslintrc.json .eslintignore ./
# dotnet specific files
COPY Directory.*.* nuget.config .nx-dotnet.rc.json ./

# do you think God stays in heaven because he too lives in fear of what he's created?
RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v20.11.0

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

RUN npm ci
# kinda wishing nx-dotnet generated a build script for me here
RUN npx nx run InMeal.Api:build:production
RUN npx nx run InMeal.Api:publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /release

COPY --from=builder /build/dist/apps/ .

COPY /apps/InMeal.Core/appsettings.json /apps/InMeal.Api/appsettings.Production.json /apps/InMeal.Api/appsettings.json ./

ENV DOTNET_EnableDiagnostics=0
ENV ASPNETCORE_ENVIRONMENT='Production'

ENTRYPOINT dotnet InMeal.Api/net7.0/InMeal.Api.dll