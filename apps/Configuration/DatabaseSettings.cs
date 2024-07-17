using Microsoft.EntityFrameworkCore;

namespace Configuration;

// TODO: checkout moving over to Postgres
public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);
