using Microsoft.EntityFrameworkCore;

namespace InMeal;

public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);
