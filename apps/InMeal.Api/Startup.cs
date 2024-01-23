using System.Text.Json.Serialization;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Configuration;
using InMeal.Api.RegistrationExtensions;
using InMeal.Core;
using InMeal.Infrastructure.Data.RecipesDb;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.Registration;

namespace InMeal.Api;

public class Startup
{
    public Startup(IConfiguration configuration) { }

    /// <summary>
    ///     Add and configure services for the container
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddControllers()
            .AddJsonOptions(opts => { opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

        services.Configure<RouteOptions>(options =>
        {
            options.LowercaseUrls = true;
            options.LowercaseQueryStrings = true;
        });

        // enable HTTP clients
        services.AddHttpClient();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    /// <summary>
    ///     Configure the Autofac container
    /// </summary>
    public static void ConfigureHostContainer(ConfigureHostBuilder hostBuilder, IConfiguration config, IWebHostEnvironment env)
    {
        hostBuilder.UseServiceProviderFactory(new AutofacServiceProviderFactory());

        hostBuilder.ConfigureContainer<ContainerBuilder>(containerBuilder =>
        {
            containerBuilder.RegisterSettings(config);
            
            if (env.IsProduction()) {
                containerBuilder.RegisterType<InMealDbMigrationContext>()
                                .WithParameter("opts", InMealDbMigrationContextFactory.GetDbContextOptions())
                                .InstancePerLifetimeScope();
            }

            containerBuilder.AddDbContextOptions<RecipeDbContext>(env.IsDevelopment())
                            .RegisterType<RecipeDbContext>()
                            .As<IRecipeDbContext>()
                            .InstancePerLifetimeScope();
            
            containerBuilder
                .AddInfrastructureServices()
                .AddApplicationServices();
        });
    }

    /// <summary>
    ///     Configure the web application depending on the environment
    /// </summary>
    public static void Configure(WebApplication app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
            app.UseSwagger()
               .UseSwaggerUI()
               .UseDeveloperExceptionPage()
               .UseCors();
        else
            // Enable the exception handler route
            app.UseExceptionHandler("/error")
               // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
               .UseHsts();

        app.UseCors();
        app.MapControllers();
    }
}