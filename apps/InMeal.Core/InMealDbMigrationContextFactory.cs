using Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace InMeal.Core;

public class InMealDbMigrationContextFactory : IDesignTimeDbContextFactory<InMealDbMigrationContext>
{
    public InMealDbMigrationContext CreateDbContext(string[] args)
    {
        Console.WriteLine("creating migration db context");
        return new(GetDbContextOptions());
    }
    
    public static DbContextOptions<InMealDbMigrationContext> GetDbContextOptions()
    {
        Console.WriteLine("starting migrations...");

        var configuration = ConfigurationFactory.GetConfiguration();
        var databaseSettings = ConfigurationFactory.GetDatabaseSettings(configuration);
        
        Console.WriteLine($"loaded configuration, will attempt to connect to a MySQL server with version ${databaseSettings.ServerVersion.Version}");

        var dbContextBuilder = new DbContextOptionsBuilder<InMealDbMigrationContext>()
            .UseMySql(databaseSettings.ConnectionString, databaseSettings.ServerVersion);
        
        Console.WriteLine("db context options configured, will begin migrations promptly");
        
        return dbContextBuilder.Options;
    }
}
