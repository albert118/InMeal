using Autofac;
using InMeal.Infrastructure;

namespace InMeal;

public static class ApplicationServiceRegistrationExtensions
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

        containerBuilder.RegisterAttributeTaggedServices<InstanceScopedServiceAttribute>();
        containerBuilder.RegisterAttributeTaggedServices<InstanceScopedBusinessServiceAttribute>();

        return containerBuilder;
    }

    /// <summary>
    /// Register any services tagged with the instance registration attribute
    /// </summary>
    /// <seealso cref="InstanceScopedServiceAttribute"/>
    private static ContainerBuilder RegisterAttributeTaggedServices<T>(this ContainerBuilder containerBuilder)
        where T : Attribute
    {
        containerBuilder.RegisterAssemblyTypes(typeof(T).Assembly)
            .Where(type => type.GetCustomAttributes(typeof(T), inherit: false).Any())
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

        return containerBuilder;
    }
}
