using Microsoft.EntityFrameworkCore;

namespace Configuration;

public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);
