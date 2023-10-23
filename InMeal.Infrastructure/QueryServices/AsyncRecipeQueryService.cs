using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.QueryServices;
using InMeal.Infrastructure.IQueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.QueryServices;

[InstanceScopedService]
public class AsyncRecipeQueryService : IAsyncRecipeQueryService
{
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeQueryService(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
    }

    public async Task<List<Recipe>> GetRecommendedRecipes(int limit, CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Recipes
                                             .ExcludeArchived()
                                             .OrderRandomly()
                                             .Take(limit)
                                             .ToListAsync(ct);

        return mementos.Select(Recipe.FromMemento).ToList(); 
    }
}