using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.QueryServices;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.QueryServices;

public class AsyncRecipeIngredientQueryService : IAsyncRecipeIngredientQueryService
{
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeIngredientQueryService(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
    }

    public Task<Dictionary<IngredientId, int>> GetIngredientUsageCountAsync(CancellationToken ct)
    {
        return _recipeDbContext.RecipeIngredients
            .GroupBy(e => e.IngredientId)
            .Select(grouping => new { IngredientId = grouping.Key, Count = grouping.Count() })
            .ToDictionaryAsync(anon => new IngredientId(anon.IngredientId), anon => anon.Count, ct);
    }

    public Task<Dictionary<IngredientId, int>> GetIngredientUsageCountAsync(IEnumerable<IngredientId> ids, CancellationToken ct)
    {
        var keys = ids.Select(id => id.Key).ToHashSet();

        return _recipeDbContext.RecipeIngredients
            .Where(e => keys.Contains(e.IngredientId))
            .GroupBy(e => e.IngredientId)
            .Select(grouping => new { IngredientId = grouping.Key, Count = grouping.Count() })
            .ToDictionaryAsync(anon => new IngredientId(anon.IngredientId), anon => anon.Count, ct);
    }
}
