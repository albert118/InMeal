using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncIngredientRepository
{
    Task<List<Ingredient>> GetIngredientsAsync(ICollection<Guid> ids, CancellationToken ct);

    Task<List<Ingredient>> AddOrGetExistingIngredientsAsync(List<string> names, CancellationToken ct);

    /// <summary>
    /// Get the first 25 ingredients, ordered by name. Pagination would be an idea in the future
    /// </summary>
    Task<List<Ingredient>> GetIngredientOptionsAsync(CancellationToken ct);
}
