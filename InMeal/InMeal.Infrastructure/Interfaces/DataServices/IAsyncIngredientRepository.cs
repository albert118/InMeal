using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncIngredientRepository
{
    Task<List<Ingredient>> GetIngredientsAsync(int skip, int take, CancellationToken ct);

    Task<List<Ingredient>> AddOrGetExistingIngredientsAsync(List<string> names, CancellationToken ct);
    
    Task<Dictionary<string, List<Ingredient>>> GetAlphabeticallyIndexedIngredientsAsync(CancellationToken ct);
}
