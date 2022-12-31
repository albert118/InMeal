using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeRepository
{
    Task<Guid?> AddRecipeAsync(string? title, string? blurb, string? prepSteps, int? cookTime, int? prepTime,
        List<AddRecipeIngredientDto> recipeIngredients,
        CancellationToken ct);

    Task<List<Recipe>> GetRecipesAsync(ICollection<Guid> ids, CancellationToken ct);

    Task<Recipe?> GetRecipeAsync(Guid id, CancellationToken ct);

    // A dumb update method
    Task<bool> EditRecipeAsync(Guid id, string title, string? blurb, string prepSteps, int? cookTime, int? prepTime,
        CancellationToken ct);
}
