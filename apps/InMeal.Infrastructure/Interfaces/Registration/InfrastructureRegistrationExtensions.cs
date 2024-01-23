using Autofac;
using Autofac.Core;
using Configuration;
using InMeal.Infrastructure.External.GenerativeRecipeImages;
using InMeal.Infrastructure.Interfaces.External.GenerativeRecipeImages;
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
        containerBuilder.RegisterWithHttpClient<IGenerativeRecipeImages, GenerativeRecipeImages>((_, client) =>
        {
            var config = ConfigurationFactory.GetConfiguration();
            var clientOpts = ConfigurationFactory.GetRecipeImageMicroserviceConfig(config);
            client.Timeout = clientOpts.Timeout;
            client.BaseAddress = clientOpts.ServiceUrl;
        });

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

    /// <summary>
    ///     Handy registration extension for typed HTTP clients within autofac 
    /// </summary>
    /// <remarks>
    /// Read more here: https://stackoverflow.com/a/72259016/9505707
    /// </remarks>
    /// <param name="containerBuilder"></param>
    /// <param name="config"></param>
    /// <typeparam name="TInterface"></typeparam>
    /// <typeparam name="TClass"></typeparam>
    /// <returns></returns>
    private static ContainerBuilder RegisterWithHttpClient<TInterface, TClass>(this ContainerBuilder containerBuilder, Action<IComponentContext, HttpClient> config)
         where TClass : class 
         where TInterface : class
    {
        containerBuilder
            .RegisterType<TClass>()
            .AsSelf()
            .As<TInterface>()
            .WithParameter(new ResolvedParameter(
                (info, _) => info.ParameterType.IsAssignableFrom(typeof(HttpClient)),
                (_, context) =>
                {
                    var httpClient = context.Resolve<IHttpClientFactory>().CreateClient();
                    config.Invoke(context, httpClient);

                    return httpClient;
                }
            )).InstancePerDependency();

        return containerBuilder;
    }
}