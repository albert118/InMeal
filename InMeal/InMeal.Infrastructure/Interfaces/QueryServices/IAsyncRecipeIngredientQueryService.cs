using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.QueryServices;

public interface IAsyncRecipeIngredientQueryService
{
    Task<Dictionary<IngredientId, int>> GetIngredientUsageCount(CancellationToken ct);
}
