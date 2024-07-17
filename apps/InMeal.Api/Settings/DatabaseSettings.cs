using Microsoft.EntityFrameworkCore;

namespace InMeal.Api.Settings;

// TODO: check if this is needed and remove (should now be in config)
public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);