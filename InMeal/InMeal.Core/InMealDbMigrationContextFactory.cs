using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace InMeal.Core;

public class InMealDbMigrationContextFactory : IDesignTimeDbContextFactory<InMealDbMigrationContext>
{
    private const string AppSettingsFilePath = "appsettings.json";

    public InMealDbMigrationContext CreateDbContext(string[] args)
    {
        Console.WriteLine("created db context");
        return new(GetDbContextOptions());
    }

    public static DbContextOptions<InMealDbMigrationContext> GetDbContextOptions()
    {
        Console.WriteLine("starting migrations...");

        // configuration for a JSON settings file will not work without
        // this package installed 'Microsoft.Extensions.Configuration.Json'
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(AppSettingsFilePath)
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
            .Build();

        var connectionString = configuration.GetConnectionString("InMealDbConnection");

        if (string.IsNullOrEmpty(connectionString))
            Console.WriteLine("a connection string was not discovered, attempting to continue may result in connection errors");

        Console.WriteLine("attempting to run migrations");

        var majorVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionMajor").Value!);
        var minorVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionMinor").Value!);
        var buildVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionBuild").Value!);

        var serverVersion = new MySqlServerVersion(new Version(majorVersion, minorVersion, buildVersion));

        var dbContextBuilder = new DbContextOptionsBuilder<InMealDbMigrationContext>()
            .UseMySql(connectionString!, serverVersion);

        Console.WriteLine("Attempting to run migrations with connection");

        return dbContextBuilder.Options;
    }
}
