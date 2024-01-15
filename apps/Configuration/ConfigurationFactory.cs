using Microsoft.Extensions.Configuration;

namespace Configuration;

public static class ConfigurationFactory
{
    public static IConfigurationRoot GetConfiguration()
    {
        const string appSettings = "appsettings..json";
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
            config.GetConnectionString("InMealDbConnection")!,
            new(new Version(
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMajor").Value!),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMinor").Value!),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionBuild").Value!)
            ))
        );
    }
}