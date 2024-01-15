# syntax=docker/dockerfile:1.4

## InMeal backend API (.NET) runtime environment

FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app

# nx build artifacts

COPY dist/apps/Configuration/ ./Configuration
COPY dist/apps/InMeal.Core/ ./InMeal.Core
COPY dist/apps/InMeal.Infrastructure/ ./InMeal.Infrastructure
COPY dist/apps/InMeal.Api/ ./InMeal.Api

# appsettings.*.json are copied across but not in the expected location
# mv isn't available on this image so we copy the outputs to a new file manually

RUN touch appsettings.json && touch appsettings.Production.json
RUN cat ./InMeal.Api/net7.0/appsettings.json > ./appsettings.json
RUN cat ./InMeal.Api/net7.0/appsettings.Production.json > ./appsettings.Production.json

ENTRYPOINT dotnet InMeal.Api/net7.0/InMeal.Api.dll
