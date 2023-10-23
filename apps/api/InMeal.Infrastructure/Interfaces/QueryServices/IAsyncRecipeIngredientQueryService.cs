using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.QueryServices;

public interface IAsyncRecipeIngredientQueryService
{
    Task<Dictionary<IngredientId, int>> GetIngredientUsageCountAsync(CancellationToken ct);
    
    Task<Dictionary<IngredientId, int>> GetIngredientUsageCountAsync(IEnumerable<IngredientId> ids, CancellationToken ct);
}
