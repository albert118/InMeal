namespace InMeal;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    /// <summary>
    /// Add and configure services for the container
    /// </summary>
    /// <param name="services"></param>
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    /// <summary>
    /// Configure the webapplication depending on the environment
    /// </summary>
    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment()) {
            app.UseSwagger()
                .UseSwaggerUI()
                .UseDeveloperExceptionPage();
        }
        else {
            // Enable the exception handler route
            app.UseExceptionHandler("/error")
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                .UseHsts();
        }

        app.UseHttpsRedirection();

        app.MapControllers();
    }
}
