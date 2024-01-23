using Autofac;
using InMeal.Infrastructure.External.GenerativeRecipeImages;
using InMeal.Infrastructure.QueryServices;
using InMeal.Infrastructure.Repositories;

namespace InMeal.Infrastructure.Interfaces.Registration;

public static class InfrastructureRegistrationExtensions
{
    /// <summary>
    /// Register query services, repo's, etc.
    /// </summary>
    /// <param name="containerBuilder"></param>
    /// <returns></returns>
    public static ContainerBuilder AddInfrastructureServices(this ContainerBuilder containerBuilder)
    {
        return containerBuilder
               .RegisterQueryServices()
               .RegisterRepositories()
               .RegisterExternalWrapperServices();
    }

    private static ContainerBuilder RegisterExternalWrapperServices(this ContainerBuilder containerBuilder)
    {
        containerBuilder.RegisterType<GenerativeRecipeImages>().AsImplementedInterfaces().InstancePerDependency();

        return containerBuilder;
    }
    private static ContainerBuilder RegisterQueryServices(this ContainerBuilder containerBuilder)
    {
        containerBuilder.RegisterType<AsyncRecipeQueryService>().AsImplementedInterfaces().InstancePerDependency();
        containerBuilder.RegisterType<AsyncRecipeCategoryQueryService>().AsImplementedInterfaces().InstancePerDependency();
        containerBuilder.RegisterType<AsyncRecipeIngredientQueryService>().AsImplementedInterfaces().InstancePerDependency();
        
        return containerBuilder;
    }
    
    private static ContainerBuilder RegisterRepositories(this ContainerBuilder containerBuilder)
    {
        containerBuilder.RegisterType<AsyncIngredientRepository>().AsImplementedInterfaces().InstancePerDependency();
        containerBuilder.RegisterType<AsyncRecipeRepository>().AsImplementedInterfaces().InstancePerDependency();
        
        return containerBuilder;
    }
}