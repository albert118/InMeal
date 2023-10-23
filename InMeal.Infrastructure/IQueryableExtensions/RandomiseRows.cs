using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.IQueryableExtensions;

public static class RandomiseRows
{
    /// <summary>
    /// Combine with Take and Skip to get N randomly selected rows
    /// </summary>
    /// <returns></returns>
    public static IQueryable<TEntity> OrderRandomly<TEntity>(this IQueryable<TEntity> query)
    {
        return query.OrderBy(e => EF.Functions.Random());
    }
}
