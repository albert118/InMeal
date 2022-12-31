using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeIngredientDataService
{
    Task<List<RecipeIngredient>> GetRecipeIngredientsAsync(Guid recipeId, CancellationToken ct);

    Task<bool> AddRecipeIngredientsAsync(Guid recipeId, List<AddRecipeIngredientDto> recipeIngredients,
        CancellationToken ct);
}
