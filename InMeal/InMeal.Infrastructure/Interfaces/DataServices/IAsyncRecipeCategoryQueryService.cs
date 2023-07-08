using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeCategoryQueryService
{
    Task<List<RecipeCategory>> GetRecipeCategoriesAsync(int? skip, int? take, CancellationToken ct);
}
