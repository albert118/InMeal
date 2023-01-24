using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace InMeal.Core;

public class InMealDbMigrationContextFactory : IDesignTimeDbContextFactory<InMealDbMigrationContext>
{
    // Holds migration infrastructure settings
    private const string AppSettingsFilePath = "appsettings.json";

    public InMealDbMigrationContext CreateDbContext(string[] args)
    {
        Console.WriteLine("Starting migration...");

        // configuration for a JSON settings file will not work without
        // this package installed 'Microsoft.Extensions.Configuration.Json'

        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(AppSettingsFilePath)
            .Build();

        var connectionString = configuration.GetConnectionString("InMealDbConnection");

        Console.WriteLine($"Attempting to run a migration using the connection settings from '{connectionString}'");

        var majorVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionMajor").Value!);
        var minorVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionMinor").Value!);
        var buildVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionBuild").Value!);

        var serverVersion = new MySqlServerVersion(new Version(majorVersion, minorVersion, buildVersion));

        var dbContextBuilder =
            new DbContextOptionsBuilder<InMealDbMigrationContext>().UseMySql(connectionString!, serverVersion);

        Console.WriteLine("created db context");

        return new(dbContextBuilder.Options);
    }
}