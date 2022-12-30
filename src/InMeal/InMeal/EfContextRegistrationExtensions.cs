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
    public static ContainerBuilder AddDatabaseSettings(this ContainerBuilder containerBuilder,
        IConfiguration appConfiguration)
    {
        var databaseSettings = new DatabaseSettings(
            appConfiguration.GetConnectionString("IridiumDbConnection"),
            new(new Version(
                int.Parse(appConfiguration.GetSection("ConnectionStrings:ServerVersionMajor").Value),
                int.Parse(appConfiguration.GetSection("ConnectionStrings:ServerVersionMinor").Value),
                int.Parse(appConfiguration.GetSection("ConnectionStrings:ServerVersionBuild").Value)
            ))
        );

        containerBuilder.RegisterInstance(databaseSettings).AsSelf().SingleInstance();

        return containerBuilder;
    }
}
