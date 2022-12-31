using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeIngredientDataService
{
    Task<List<RecipeIngredient>> GetRecipeIngredientsAsync(Guid recipeId, CancellationToken ct);

    Task<bool> AddRecipeIngredientsAsync(Recipe existingRecipe, List<AddRecipeIngredientDto> recipeIngredients,
        CancellationToken ct);
}
