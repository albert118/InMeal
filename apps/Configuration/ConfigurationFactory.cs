using Microsoft.Extensions.Configuration;

namespace Configuration;

public static class ConfigurationFactory
{
    public static IConfigurationRoot GetConfiguration()
    {
        const string appSettings = "appsettings.json";
        var appSettingsEnv = $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json";
        
        return new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
                // requires Microsoft.Extensions.Configuration.Json
               .AddJsonFile(appSettings)
               .AddJsonFile(appSettingsEnv, optional: true)
               // requires Microsoft.Extensions.Configuration.EnvironmentVariables
               .AddEnvironmentVariables()
               .Build();
    }
    
    public static DatabaseSettings GetDatabaseSettings(IConfiguration config)
    {
        return new DatabaseSettings(
            config.GetConnectionString("InMealDbConnection") ??
            throw new ArgumentException("database connection should be configured to continue"),
            new(new Version(
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMajor").Value ??
                          throw new ArgumentException("database major version should be configured to continue")),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMinor").Value ??
                          throw new ArgumentException("database minor version should be configured to continue")),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionBuild").Value ??
                          throw new ArgumentException("database build version should be configured to continue"))
            ))
        );
    }

    public static GenerativeRecipeImagesMicroserviceConfig GetFakeRecipeImageMicroserviceConfig(IConfiguration config)
    {
        return new GenerativeRecipeImagesMicroserviceConfig(
            config.GetSection("GenerativeRecipeImageMicroservice:ServiceUrl").Value ??
            throw new ArgumentException("a URL must be defined for the generative recipe image microservice")
        );
    }
}