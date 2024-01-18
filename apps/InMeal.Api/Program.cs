using Configuration;
using InMeal.Api;
using InMeal.Core;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);

// Configure the host container (Autofac) within this method
Startup.ConfigureHostContainer(
    builder.Host,
    ConfigurationFactory.GetConfiguration(),
    builder.Environment
);

// Configure the global Microsoft container services
startup.ConfigureServices(builder.Services);

var app = builder.Build();

// Configure the app and web request pipeline
Startup.Configure(app, builder.Environment);

// only attempt to auto-run migrations in production

app.Logger.LogInformation("configured services");
app.Logger.LogInformation("detected environment as \'{BuilderEnvironment}\'", builder.Environment.EnvironmentName);

if (builder.Environment.IsProduction()) {
    using var scope = app.Services.CreateScope();
    var migrationDbContext = scope.ServiceProvider.GetRequiredService<InMealDbMigrationContext>();

    try {
        app.Logger.LogInformation("running migrations");
        migrationDbContext.Database.Migrate();
    } catch (Exception ex) {
        app.Logger.LogError(ex, "failed to run migrations");
        throw new ApplicationException("failed migrations - aborting application launch");
    }

    app.Logger.LogInformation("finished migrations");
}

app.Logger.LogInformation("starting application");
app.Run();