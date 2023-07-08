using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeIngredientQueryService
{
    Task<Dictionary<IngredientId, int>> GetIngredientUsageCount(CancellationToken ct);
}
