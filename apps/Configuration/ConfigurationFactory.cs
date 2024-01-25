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

    public static GenerativeRecipeImagesMicroserviceConfig GetRecipeImageMicroserviceConfig(IConfiguration config)
    {
        var serviceUrlAsString = config.GetValue<string>("GenerativeRecipeImageMicroservice:ServiceUrl");
        ArgumentException.ThrowIfNullOrEmpty(serviceUrlAsString);
        // ensure a following slash is always present
        var serviceUrl = new Uri(serviceUrlAsString.TrimEnd('/') + "/");

        var proxyPath = config.GetValue<string>("GenerativeRecipeImageMicroservice:ProxyPath");
        ArgumentException.ThrowIfNullOrEmpty(proxyPath);
        // ensure no following slash is ever present unless it is the only character
        if (proxyPath != "/") proxyPath = proxyPath.TrimEnd('/');
        
        var timeoutInSeconds = config.GetValue<int>("GenerativeRecipeImageMicroservice:Timeout");
        if (timeoutInSeconds <= 0) throw new ArgumentOutOfRangeException("timeout must be at least 1s");
        
        var retryCount = config.GetValue<int>("GenerativeRecipeImageMicroservice:RetryCount");
        if (retryCount < 0) throw new ArgumentOutOfRangeException("cannot have a negative retry count (set 0 to disable)");

        return new GenerativeRecipeImagesMicroserviceConfig(
            ServiceUrl: serviceUrl,
            ProxyPath: proxyPath,
            Timeout: new TimeSpan(timeoutInSeconds * TimeSpan.TicksPerSecond),
            RetryCount: retryCount
        );
    }
}