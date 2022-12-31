using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncRecipeIngredientDataService : IAsyncRecipeIngredientDataService
{
    private readonly ILogger<AsyncRecipeIngredientDataService> _logger;
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeIngredientDataService(IRecipeDbContext recipeDbContext,
        ILogger<AsyncRecipeIngredientDataService> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public Task<List<RecipeIngredient>> GetRecipeIngredientsAsync(Guid recipeId, CancellationToken ct)
    {
        if (recipeId.IsEmpty()) {
            throw new DataException(
                "Attempting to get ingredients for recipe with an empty ID ('00000000-0000-0000-0000-000000000000') is not possible");
        }

        return _recipeDbContext.RecipeIngredients.Where(ri => ri.Recipe.Id == recipeId).ToListAsync(ct);
    }

    public Task<bool> AddRecipeIngredientsAsync(Guid recipeId, List<AddRecipeIngredientDto> recipeIngredients,
        CancellationToken ct)
    {
        if (recipeId.IsEmpty()) {
            throw new DataException(
                "Attempting to add ingredients to a recipe with an empty ID ('00000000-0000-0000-0000-000000000000') is not possible");
        }

        try {
            _recipeDbContext.RecipeIngredients.AddRangeAsync(
                recipeIngredients.Select(ri => new Recipe()),
                ct
            );
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An error occured while editing an existing recipe");
            return Task.FromResult(false);
        }

        return Task.FromResult(true);
    }
}
