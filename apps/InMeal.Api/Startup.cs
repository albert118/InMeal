using System.Text.Json.Serialization;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using InMeal.Api.RegistrationExtensions;
using InMeal.Infrastructure.Configuration;

namespace InMeal.Api;

public class Startup
{
    public Startup(IConfiguration configuration) { }

    /// <summary>
    ///     Add and configure services for the container
    /// </summary>
    /// <param name="services"></param>
    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddControllers()
            .AddJsonOptions(opts => { opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

        services.Configure<RouteOptions>(options =>
        {
            options.LowercaseUrls = true;
            options.LowercaseQueryStrings = true;
        });

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
            containerBuilder
                .RegisterDatabaseSettings(config)
                // avoid passing the IWebHostEnvironment to the infrastructure layer
                .AddEfCoreDbContexts(isDevelopment: env.IsDevelopment(), isProduction: env.IsProduction())
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