using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Configuration;

public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);