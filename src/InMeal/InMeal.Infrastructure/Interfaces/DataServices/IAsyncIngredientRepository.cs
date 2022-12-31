using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncIngredientRepository
{
    Task<List<Ingredient>> GetIngredientsAsync(ICollection<Guid> ids, CancellationToken ct);

    Task<bool> AddIngredientsAsync(ICollection<string> names, CancellationToken ct);
}
