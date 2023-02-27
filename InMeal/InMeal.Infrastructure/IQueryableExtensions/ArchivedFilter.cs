using InMeal.Core;

namespace InMeal.Infrastructure.DbContextExtensions;

public static class IsArchived
{
    public static IQueryable<TEntity> ExcludeArchived<TEntity>(this IQueryable<TEntity> query)
        where TEntity : IArchivable
    {
        return query.Where(e => !e.isArchived);
    }

    public static IQueryable<TEntity> IncludeArchived<TEntity>(this IQueryable<TEntity> query)
        where TEntity : IArchivable
    {
        return query.Where(e => e.isArchived);
    }
}
