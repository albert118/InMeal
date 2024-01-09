using Autofac;
using InMeal.Api.Settings;
using InMeal.Core;
using InMeal.Infrastructure.Data.RecipesDb;
using InMeal.Infrastructure.Interfaces.Data;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Api.RegistrationExtensions;

public static class EfContextRegistrationExtensions
{
    /// <summary>
    ///     Add the relevant EF Core db contexts
    /// </summary>
    public static ContainerBuilder AddEfCoreDbContexts(this ContainerBuilder builder, IWebHostEnvironment env)
    {
        if (env.IsProduction())
            builder.AddInMealDbMigrationsContextDbContext();

        builder.AddRecipeDbContextDbContext(env);

        return builder;
    }

    /// <summary>
    ///     Configure the ef core database (sets the db connection string)
    /// </summary>
    public static ContainerBuilder AddDatabaseSettings(this ContainerBuilder containerBuilder, IConfiguration config)
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

    private static ContainerBuilder AddDbContextOptions<TContext>(this ContainerBuilder containerBuilder,
        IWebHostEnvironment env)
        where TContext : DbContext
    {
        containerBuilder.Register(sp =>
                        {
                            var loggerFactory = sp.Resolve<ILoggerFactory>();
                            var dbSettings = sp.Resolve<DatabaseSettings>();
                            var builder = new DbContextOptionsBuilder<TContext>()
                                          .UseLoggerFactory(loggerFactory)
                                          .UseMySql(dbSettings.ConnectionString, dbSettings.ServerVersion);

                            if (env.IsDevelopment()) builder.EnableDetailedErrors().EnableSensitiveDataLogging();

                            // make sure to return options here! Otherwise we'll register the builder
                            return builder.Options;
                        })
                        .AsSelf()
                        .SingleInstance();

        return containerBuilder;
    }

    private static ContainerBuilder AddRecipeDbContextDbContext(this ContainerBuilder builder, IWebHostEnvironment env)
    {
        builder
            .AddDbContextOptions<RecipeDbContext>(env)
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