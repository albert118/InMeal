using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Infrastructure.Interfaces.QueryServices;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.QueryServices;

[InstanceScopedService]
public class AsyncRecipeCategoryQueryService : IAsyncRecipeCategoryQueryService
{
    private readonly IRecipeDbContext _recipeDbContext;

    private const int DefaultTake = 50;

    public AsyncRecipeCategoryQueryService(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
    }

    public async Task<List<RecipeCategory>> GetRecipeCategoriesAsync(int? skip, int? take, CancellationToken ct)
    {
        var mementos = await _recipeDbContext.RecipeCategories
            .OrderBy(i => i.Category)
            .Skip(skip ?? 0)
            .Take(take ?? DefaultTake)
            .ToListAsync(ct);

        return mementos.Select(RecipeCategory.FromMemento).ToList();
    }
}
