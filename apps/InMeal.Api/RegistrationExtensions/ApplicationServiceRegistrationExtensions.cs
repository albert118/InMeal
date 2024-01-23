using Autofac;
using InMeal.Api.Features.Ingredients;
using InMeal.Api.Features.Recipes;
using InMeal.Api.Features.Upcoming;

namespace InMeal.Api.RegistrationExtensions;

public static class ApplicationServiceRegistrationExtensions
{
    /// <summary>
    ///     Add the application layer services
    /// </summary>
    /// <param name="containerBuilder"></param>
    /// <returns></returns>
    public static ContainerBuilder AddApplicationServices(this ContainerBuilder containerBuilder)
    {
        containerBuilder
            .RegisterType<CancellationTokenAccessor>()
            .As<ICancellationTokenAccessor>()
            .InstancePerLifetimeScope();

        return containerBuilder.RegisterManagersAndServices();
    }
    
    private static ContainerBuilder RegisterManagersAndServices(this ContainerBuilder containerBuilder)
    {
        containerBuilder.RegisterType<RecommendedRecipesService>().AsImplementedInterfaces().InstancePerDependency();
        containerBuilder.RegisterType<RecipeManager>().AsImplementedInterfaces().InstancePerDependency();
        containerBuilder.RegisterType<IngredientsManager>().AsImplementedInterfaces().InstancePerDependency();
        
        return containerBuilder;
    }
}