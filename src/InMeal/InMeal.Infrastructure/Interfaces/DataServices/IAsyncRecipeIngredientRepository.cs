using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeIngredientRepository
{
    Task<List<RecipeIngredient>> GetRecipeIngredientsAsync(Guid recipeId, CancellationToken ct);

    bool AddRecipeIngredients(Recipe existingRecipe, List<AddRecipeIngredientDto> recipeIngredients);
}
