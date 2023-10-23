using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.QueryServices;

public interface IAsyncRecipeQueryService
{
    Task<List<Recipe>> GetRecommendedRecipes(int limit, CancellationToken ct);
}