using InMeal.Core.Entities;
using InMeal.Core.Enumerations;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeRepository
{
    Task UpdateRecipesAsync(List<Recipe> recipes, CancellationToken ct);

    Task<RecipeId?> AddRecipeAsync(Recipe recipe, CancellationToken ct);

    Task<Dictionary<MealCourse, List<Recipe>>> GetManyGroupedByMealCourseAsync(bool includeArchived, CancellationToken ct);

    Task<List<Recipe>> GetRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct);

    Task<Recipe?> GetRecipeAsync(RecipeId id, CancellationToken ct);

    Task<Recipe> EditRecipeAsync(Recipe updatedRecipe, CancellationToken ct);

    Task ArchiveRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct);

    Task RestoreRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct);

    Task<bool> IsRecipeTitleUnique(string title, CancellationToken ct);
}
