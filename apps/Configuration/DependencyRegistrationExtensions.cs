using System.Linq.Expressions;
using Autofac;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Configuration;

public static class DependencyRegistrationExtensions
{
    public static ContainerBuilder RegisterDatabaseSettings(this ContainerBuilder containerBuilder, IConfiguration config)
    {
        containerBuilder.RegisterInstance(ConfigurationFactory.GetDatabaseSettings(config))
                        .AsSelf()
                        .SingleInstance();
        
        return containerBuilder;
    }
    
    public static ContainerBuilder AddEfCoreDbContexts(this ContainerBuilder builder, Expression<Action<ContainerBuilder>> addMigrationContext, Expression<Action<ContainerBuilder, bool>> addDbContexts, bool isProduction)
    {
        if (isProduction) addMigrationContext.Compile();
        
        addDbContexts.Compile();

        return builder;
    }
    public static ContainerBuilder AddDbContextOptions<TContext>(this ContainerBuilder containerBuilder, bool isDevelopment)
        where TContext : DbContext
    {
        containerBuilder.Register(sp => 
                        {
                            var loggerFactory = sp.Resolve<ILoggerFactory>();
                            var dbSettings = sp.Resolve<DatabaseSettings>();
                            var builder = new DbContextOptionsBuilder<TContext>()
                                          .UseLoggerFactory(loggerFactory)
                                          .UseMySql(dbSettings.ConnectionString, dbSettings.ServerVersion);

                            if (isDevelopment) builder.EnableDetailedErrors().EnableSensitiveDataLogging();

                            // make sure to return options here! Otherwise we'll register the builder
                            return builder.Options;
                        })
                        .AsSelf()
                        .SingleInstance();

        return containerBuilder;
    }
}
