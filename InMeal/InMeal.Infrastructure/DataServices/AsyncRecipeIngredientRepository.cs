using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncRecipeIngredientRepository : IAsyncRecipeIngredientRepository
{
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeIngredientRepository(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
    }

    public Task<List<RecipeIngredient>> GetRecipeIngredientsAsync(Guid recipeId, CancellationToken ct)
    {
        if (recipeId.IsEmpty()) {
            throw new DataException("Attempting to get ingredients for recipe with an empty ID ('00000000-0000-0000-0000-000000000000') is not possible");
        }

        return _recipeDbContext.RecipeIngredients.Where(ri => ri.Recipe.Id == recipeId).ToListAsync(ct);
    }

    public Task<Dictionary<Guid, int>> GetIngredientUsageCount(CancellationToken ct)
    {
        return _recipeDbContext.RecipeIngredients
            .GroupBy(e => e.IngredientId)
            .Select(grouping => new { IngredientId = grouping.Key, Count = grouping.Count() })
            .ToDictionaryAsync(anon => anon.IngredientId, anon => anon.Count, ct);
    }
}
