using Microsoft.EntityFrameworkCore;

namespace InMeal.Api.Settings;

public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);