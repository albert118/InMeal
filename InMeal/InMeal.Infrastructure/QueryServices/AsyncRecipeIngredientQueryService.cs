using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.QueryServices;

[InstanceScopedService]
public class AsyncRecipeIngredientQueryService : IAsyncRecipeIngredientQueryService
{
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeIngredientQueryService(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
    }

    public Task<Dictionary<IngredientId, int>> GetIngredientUsageCount(CancellationToken ct)
    {
        return _recipeDbContext.RecipeIngredients
            .GroupBy(e => e.IngredientId)
            .Select(grouping => new { IngredientId = grouping.Key, Count = grouping.Count() })
            .ToDictionaryAsync(anon => new IngredientId(anon.IngredientId), anon => anon.Count, ct);
    }
}
