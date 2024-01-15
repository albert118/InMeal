# syntax=docker/dockerfile:1.4

## InMeal backend API (.NET)

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:7.0 AS base

WORKDIR /src

# TODO avoid copying source code and instead copy the 
# Nx build task outputs

COPY apps/Configuration/ ./Configuration
COPY apps/InMeal.*/ ./

RUN dotnet restore

FROM base as builder

COPY . .
RUN dotnet build -c Release -o /build

FROM builder as publisher

RUN dotnet publish -c Release -o /publish

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app
COPY --from=publisher /publish .

ENTRYPOINT dotnet InMeal.dll
