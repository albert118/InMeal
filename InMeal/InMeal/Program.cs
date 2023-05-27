using InMeal;
using InMeal.Core;
using Microsoft.EntityFrameworkCore;

const string appSettingsFilePath = "appsettings.json";

// retrieve and inject the application configuration
var appConfig = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile(appSettingsFilePath)
    .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
    .Build();

var builder = WebApplication.CreateBuilder(args);

var startup = new Startup(builder.Configuration);

// Configure the host container (Autofac) within this method
Startup.ConfigureHostContainer(builder.Host, appConfig);

// Configure the global Microsoft container services
startup.ConfigureServices(builder.Services);

var app = builder.Build();

// Configure the app and web request pipeline
Startup.Configure(app, builder.Environment);

// only attempt to auto-run migrations outside of development environs to speed up build-times
if (!builder.Environment.IsDevelopment()) {
    using var scope = app.Services.CreateScope();
    var migrationDbContext = scope.ServiceProvider.GetRequiredService<InMealDbMigrationContext>();
    migrationDbContext.Database.Migrate();
}

app.Run();
