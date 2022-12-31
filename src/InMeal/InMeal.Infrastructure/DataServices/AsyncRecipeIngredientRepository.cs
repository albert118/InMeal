using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncRecipeIngredientRepository : IAsyncRecipeIngredientRepository
{
    private readonly ILogger<AsyncRecipeIngredientRepository> _logger;
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeIngredientRepository(IRecipeDbContext recipeDbContext,
        ILogger<AsyncRecipeIngredientRepository> logger)
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

    public async Task<bool> AddRecipeIngredientsAsync(Recipe existingRecipe,
        List<AddRecipeIngredientDto> recipeIngredients, CancellationToken ct)
    {
        if (existingRecipe.Id.IsEmpty()) {
            throw new DataException(
                "Attempting to add recipe ingredients to a recipe with an empty ID ('00000000-0000-0000-0000-000000000000') is not possible");
        }

        if (recipeIngredients.Any(ri => ri.Ingredient.Id.IsEmpty())) {
            throw new DataException(
                "Attempting to add link ingredients to a recipe with empty ID(s) ('00000000-0000-0000-0000-000000000000') is not possible");
        }

        // include FK linkage based on the passed Ingredient.Id
        var newRecipeIngredients = recipeIngredients
            .Select(ri => new RecipeIngredient {IngredientId = ri.Ingredient.Id, Quantity = ri.Quantity})
            .ToList();

        try {
            existingRecipe.RecipeIngredients = newRecipeIngredients;

            await _recipeDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An error occured while editing an existing recipe");
            return false;
        }

        return true;
    }
}
