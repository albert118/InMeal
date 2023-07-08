using Microsoft.EntityFrameworkCore;

namespace InMeal.Settings;

public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);