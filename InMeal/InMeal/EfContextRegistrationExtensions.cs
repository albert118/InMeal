using Autofac;
using InMeal.Infrastructure;
using InMeal.Infrastructure.Data.RecipesDb;
using InMeal.Infrastructure.Interfaces.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace InMeal;

public static class EfContextRegistrationExtensions
{
    /// <summary>
    /// Add the application layer services
    /// </summary>
    /// <param name="containerBuilder"></param>
    /// <returns></returns>
    public static ContainerBuilder AddApplicationServices(this ContainerBuilder containerBuilder)
    {
        containerBuilder
            .RegisterType<CancellationTokenAccessor>()
            .As<ICancellationTokenAccessor>()
            .InstancePerLifetimeScope();

        containerBuilder.RegisterSimpleAttributedServices(typeof(InstanceScopedServiceAttribute).Assembly);

        return containerBuilder;
    }

    /// <summary>
    /// Register any services tagged with the instance registration attribute
    /// </summary>
    /// <param name="assembly">The assembly to search (passing the tag's assembly is an easy start)</param>
    /// <seealso cref="InstanceScopedServiceAttribute"/>
    private static ContainerBuilder RegisterSimpleAttributedServices(this ContainerBuilder containerBuilder,
        Assembly assembly)
    {
        containerBuilder.RegisterAssemblyTypes(assembly)
            .Where(type => type.GetCustomAttributes(typeof(InstanceScopedServiceAttribute), inherit: false).Any())
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

        return containerBuilder;
    }

    /// <summary>
    /// Add the relevant EF Core db contexts
    /// </summary>
    public static ContainerBuilder AddEfCoreDbContexts(this ContainerBuilder builder)
    {
        return builder.AddRecipeDbContextDbContext();
    }

    /// <summary>
    /// Configure the ef core database (sets the db connection string)
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

    private static ContainerBuilder AddDbContextOptions<TContext>(this ContainerBuilder containerBuilder)
        where TContext : DbContext
    {
        containerBuilder.Register(sp => {
                var loggerFactory = sp.Resolve<ILoggerFactory>();
                var dbSettings = sp.Resolve<DatabaseSettings>();
                return new DbContextOptionsBuilder<TContext>()
                    .UseLoggerFactory(loggerFactory)
                    .UseMySql(dbSettings.ConnectionString, dbSettings.ServerVersion)
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging()
                    .Options; // make sure to return options here! Otherwise we'll register the builder
            })
            .AsSelf()
            .SingleInstance();

        return containerBuilder;
    }

    private static ContainerBuilder AddRecipeDbContextDbContext(this ContainerBuilder builder)
    {
        builder
            // Add the context option with logging to Autofac (inject the db settings)
            .AddDbContextOptions<RecipeDbContext>()
            // set up the container registration and scoping
            .RegisterType<RecipeDbContext>()
            .As<IRecipeDbContext>()
            .InstancePerLifetimeScope();

        return builder;
    }
}