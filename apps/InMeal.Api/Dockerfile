FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS publisher

WORKDIR /build

COPY /apps/Configuration ./Configuration
COPY /apps/InMeal.Api ./InMeal.Api
COPY /apps/InMeal.Infrastructure ./InMeal.Infrastructure
COPY /apps/InMeal.Core ./InMeal.Core
COPY README.md LICENSE Directory.*.* nuget.config ./

# target the runtime image environment and slim
# down deployments with a self-contained artifact
RUN mkdir /publish; \
    dotnet publish InMeal.Api -o /publish \
    --self-contained --runtime alpine-x64 --verbosity quiet \
    --configuration Release \
    -p:PublishReadyToRun=true

FROM alpine:3.19 as runtime

WORKDIR /release

# https://learn.microsoft.com/en-us/dotnet/core/install/linux-alpine#dependencies
RUN apk update; \
    apk add --no-cache openssh libunwind nghttp2-libs \
    libidn krb5-libs libuuid lttng-ust zlib \
    libgcc libstdc++

COPY --from=publisher /publish .

COPY /apps/InMeal.Core/appsettings.json /apps/InMeal.Api/appsettings.Production.json /apps/InMeal.Api/appsettings.json ./

ENV DOTNET_EnableDiagnostics=0
ENV ASPNETCORE_ENVIRONMENT='Production'
# disabled to avoid installing ICU
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

# RUN ls -a ./ && ls asda
ENTRYPOINT ./InMeal.Api