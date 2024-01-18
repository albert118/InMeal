using Autofac;
using InMeal.Api.Features.Ingredients;
using InMeal.Api.Features.Recipes;
using InMeal.Api.Features.Upcoming;
using InMeal.Infrastructure.QueryServices;
using InMeal.Infrastructure.Repositories;

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

        return containerBuilder
            .RegisterQueryServices()
            .RegisterRepositories()
            .RegisterManagersAndServices();
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
    
    private static ContainerBuilder RegisterManagersAndServices(this ContainerBuilder containerBuilder)
    {
        containerBuilder.RegisterType<RecommendedRecipesService>().AsImplementedInterfaces().InstancePerDependency();
        containerBuilder.RegisterType<RecipeManager>().AsImplementedInterfaces().InstancePerDependency();
        containerBuilder.RegisterType<IngredientsManager>().AsImplementedInterfaces().InstancePerDependency();
        
        return containerBuilder;
    }
}