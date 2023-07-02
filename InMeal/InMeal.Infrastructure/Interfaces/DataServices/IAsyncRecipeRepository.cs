using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeRepository
{
    Task<RecipeId?> AddRecipeAsync(Recipe recipe, CancellationToken ct);

    Task<List<Recipe>> GetRecipesAsync(CancellationToken ct);

    Task<List<Recipe>> GetAllArchivedRecipesAsync(CancellationToken ct);

    Task<List<Recipe>> GetRecommendedRecipes(int limit, CancellationToken ct);

    Task<List<Recipe>> GetRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct);

    Task<Recipe?> GetRecipeAsync(RecipeId id, CancellationToken ct);

    Task<Recipe> EditRecipeAsync(Recipe updatedRecipe, CancellationToken ct);

    Task ArchiveRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct);
}
