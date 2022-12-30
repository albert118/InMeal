using InMeal;

var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);

// Do not configure or register the container services here! Instead edit Startup.ConfigureServices
startup.ConfigureServices(builder.Services);

var app = builder.Build();

// Do not configure the HTTP request pipeline in this Program entrypoint instead edit Startup.Configure
startup.Configure(app, builder.Environment);

app.Run();
