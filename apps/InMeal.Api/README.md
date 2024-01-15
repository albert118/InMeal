# InMeal DotNet API

The API (and DAL) for In Meal.

## Configuration Basics

Configuration is loaded using helpers in the `Configuration` project.
`InMeal.Api` is the typical startup project, but `InMeal.Core` can
be used as a migration startup project as well. Both of these projects
will look for configuration in the following order,

1. `appsettings.json`
2. `appsettings.ENVIRONMENT_NAME.json`
3. environment variables

These settings cascade (ie. 3 > 2 > 1).

## Configuration with Environment Variables

If instead you wish to configure these through environment variables
then DO A THING

## Recommended Production Configuration

Production will require a valid database connection in the format,

```json
"ConnectionStrings": {
    "InMealDbConnection": "Server=127.0.0.1;Port=3306;Database=MyDatabase;User=myUser;Password=verysecretpassword",
    "ServerVersionMajor": "1",
    "ServerVersionMinor": "2",
    "ServerVersionBuild": "3"
}
```

It is also recommended to configure the allowed hosts too,

```json
"AllowedHosts": "some.special.host",
```

These settings are not configured in the tracked `appsettings.Production.json` file
for security reasons.

## Configuring the Migration (Core) Project

Like the production config, you should specify the connection string,

```json
"ConnectionStrings": {
    "InMealDbConnection": "Server=127.0.0.1;Port=3306;Database=MyDatabase;User=myUser;Password=verysecretpassword",
    "ServerVersionMajor": "1",
    "ServerVersionMinor": "2",
    "ServerVersionBuild": "3"
}
```

## Developer Certificate

You can trust the developer certifate by running either,

```sh
dotnet dev-certs https --trust
```

or

```sh
nx run InMeal.Api:trust-certs
```

This should be disabled in all other environments with

```sh
DOTNET_GENERATE_ASPNET_CERTIFICATE=false
```

[Read more here](https://learn.microsoft.com/en-au/aspnet/core/security/enforcing-ssl?view=aspnetcore-8.0&tabs=visual-studio%2Clinux-ubuntu)
