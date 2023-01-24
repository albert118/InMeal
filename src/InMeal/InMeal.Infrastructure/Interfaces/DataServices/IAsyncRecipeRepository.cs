using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeRepository
{
    Task<Guid?> AddRecipeAsync(string? title, string? blurb, string? prepSteps, int? cookTime, int? prepTime,
        List<RecipeIngredientDto> recipeIngredients,
        CancellationToken ct);

    Task<List<Recipe>> GetRecipesAsync(ICollection<Guid> ids, CancellationToken ct);

    Task<Recipe?> GetRecipeAsync(Guid id, CancellationToken ct);

    Task<bool> EditRecipeAsync(Guid recipeId, RecipeDto updatedRecipe, IReadOnlyList<RecipeIngredientDto> recipeIngredients, CancellationToken ct);
}
