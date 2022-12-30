using Autofac;

namespace InMeal;

public static class EfContextRegistrationExtensions
{
    /// <summary>
    /// Add the relevant EF Core db contexts
    /// </summary>
    public static ContainerBuilder AddEfCoreDbContexts(this ContainerBuilder builder)
    {
        // builder.AddMySpecialContext();

        return builder;
    }

    /// <summary>
    /// Configure the ef core database (sets the db connection string)
    /// </summary>
    public static ContainerBuilder AddDatabaseSettings(this ContainerBuilder containerBuilder, IConfiguration config)
    {
        var databaseSettings = new DatabaseSettings(
            config.GetConnectionString("InMealDbConnection"),
            new(new Version(
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMajor").Value),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMinor").Value),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionBuild").Value)
            ))
        );

        containerBuilder.RegisterInstance(databaseSettings).AsSelf().SingleInstance();

        return containerBuilder;
    }
}
