FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS builder

WORKDIR /build

COPY /apps/Configuration ./apps/Configuration
COPY /apps/InMeal.Api ./apps/InMeal.Api
COPY /apps/InMeal.Infrastructure ./apps/InMeal.Infrastructure
COPY /apps/InMeal.Core ./apps/InMeal.Core

# meta and misc.
COPY README.md LICENSE .nxignore package.json package-lock.json tsconfig.base.json nx.json .eslintrc.json .eslintignore ./
# dotnet specific files
COPY Directory.*.* nuget.config .nx-dotnet.rc.json ./

RUN apk add --no-cache npm nodejs;

# if this fails for some reason, including the node details is helpful
RUN node --version && npm ci
RUN npx nx run InMeal.Api:publish

FROM alpine:3.19 as runtime

WORKDIR /release

# https://github.com/dotnet/core/blob/main/Documentation/build-and-install-rhel6-prerequisites.md#how-to-use-net-core-on-rhel-6--centos-6
RUN apk update; \
    apk add --no-cache openssh libunwind nghttp2-libs \
    libidn krb5-libs libuuid \
    lttng-ust zlib

COPY --from=builder /build/dist/apps/ .

COPY /apps/InMeal.Core/appsettings.json /apps/InMeal.Api/appsettings.Production.json /apps/InMeal.Api/appsettings.json ./

ENV DOTNET_EnableDiagnostics=0
ENV ASPNETCORE_ENVIRONMENT='Production'
# disabled to avoid installing ICU
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

ENTRYPOINT dotnet InMeal.Api/net7.0/InMeal.Api.dll