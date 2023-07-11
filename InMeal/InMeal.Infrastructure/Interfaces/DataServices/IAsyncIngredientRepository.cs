﻿using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncIngredientRepository
{
    Task AddManyAsync(List<Ingredient> ingredients, CancellationToken ct);

    Task UpdateAsync(List<Ingredient> ingredients, CancellationToken ct);
    
    Task<List<Ingredient>> GetManyAsync(int skip, int take, CancellationToken ct);
    
    Task<Ingredient?> GetAsync(IngredientId id, CancellationToken ct);

    Task<List<Ingredient>> GetManyAsync(List<string> names, CancellationToken ct);
    
    Task<Dictionary<string, List<Ingredient>>> GetManyOrderedAlphabeticallyAsync(CancellationToken ct);
    
    Task<bool> DeleteManyAsync(IEnumerable<IngredientId> ingredientIds, CancellationToken ct);
}
