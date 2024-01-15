using Autofac;
using InMeal.Core;
using InMeal.Infrastructure.Data.RecipesDb;
using InMeal.Infrastructure.Interfaces.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace InMeal.Infrastructure.Configuration;

public static class DependencyRegistrationExtensions
{
    public static ContainerBuilder RegisterDatabaseSettings(this ContainerBuilder containerBuilder, IConfiguration config)
    {
        var databaseSettings = new DatabaseSettings(
            config.GetConnectionString("InMealDbConnection")!,
            new(new Version(
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMajor").Value!),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMinor").Value!),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionBuild").Value!)
            ))
        );

        containerBuilder.RegisterInstance(databaseSettings).AsSelf().SingleInstance();
        
        return containerBuilder;
    }
    
    public static ContainerBuilder AddEfCoreDbContexts(this ContainerBuilder builder, bool isDevelopment, bool isProduction)
    {
        if (isProduction) builder.AddInMealDbMigrationsContextDbContext();

        builder.AddRecipeDbContextDbContext(isDevelopment);

        return builder;
    }

    private static ContainerBuilder AddDbContextOptions<TContext>(this ContainerBuilder containerBuilder, bool isDevelopment)
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

    private static ContainerBuilder AddRecipeDbContextDbContext(this ContainerBuilder builder, bool isDevelopment)
    {
        builder
            .AddDbContextOptions<RecipeDbContext>(isDevelopment)
            .RegisterType<RecipeDbContext>()
            .As<IRecipeDbContext>()
            .InstancePerLifetimeScope();

        return builder;
    }

    private static ContainerBuilder AddInMealDbMigrationsContextDbContext(this ContainerBuilder builder)
    {
        builder
            .RegisterType<InMealDbMigrationContext>()
            .WithParameter("opts", InMealDbMigrationContextFactory.GetDbContextOptions())
            .InstancePerLifetimeScope();

        return builder;
    }
}