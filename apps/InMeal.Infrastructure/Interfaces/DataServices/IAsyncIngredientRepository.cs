using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncIngredientRepository
{
    Task AddManyAsync(List<Ingredient> ingredients, CancellationToken ct);

    Task UpdateAsync(Ingredient ingredient, CancellationToken ct);
    
    Task<List<Ingredient>> GetManyAsync(int skip, int take, CancellationToken ct);
    
    Task<Ingredient?> GetAsync(IngredientId id, CancellationToken ct);

    Task<List<Ingredient>> GetManyAsync(List<string> names, CancellationToken ct);
    
    Task<List<Ingredient>> GetManyAsync(List<IngredientId> ids, CancellationToken ct);
    
    Task<Dictionary<string, List<Ingredient>>> GetManyOrderedAlphabeticallyAsync(CancellationToken ct);
    
    Task DeleteManyAsync(List<IngredientId> ingredientIds, CancellationToken ct);

    Task<bool> IsIngredientNameUnique(string name, CancellationToken ct);
}
