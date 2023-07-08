using System.Data;
using InMeal.Core.Entities;
using InMeal.Core.Extensions;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncIngredientRepository : IAsyncIngredientRepository
{
    private readonly IRecipeDbContext _recipeDbContext;
    private readonly ILogger<AsyncIngredientRepository> _logger;

    public AsyncIngredientRepository(IRecipeDbContext recipeDbContext, ILogger<AsyncIngredientRepository> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public async Task UpdateNameAsync(IngredientId id, string newName, CancellationToken ct)
    {
        var existingIngredient = await _recipeDbContext.Ingredients.SingleAsync(i => i.Id == id.Id, ct);
        existingIngredient.Name = newName;
        await _recipeDbContext.SaveChangesAsync(ct);
    }

    public Task<List<Ingredient>> GetManyAsync(int skip, int take, CancellationToken ct)
    {
        return _recipeDbContext.Ingredients
            .OrderBy(i => i.Name)
            .Skip(skip)
            .Take(take)
            .ToListAsync(ct);
    }
    
    public async Task<List<Ingredient>> GetManyAsync(List<string> names, CancellationToken ct)
    {
        return await _recipeDbContext.Ingredients
                                     .Where(i => names.Contains(i.Name))
                                     .ToListAsync(ct);
    }

    public async Task<Dictionary<string, List<Ingredient>>> GetManyOrderedAlphabeticallyAsync(CancellationToken ct)
    {
        var orderedIngredients = await _recipeDbContext.Ingredients
            .OrderBy(i => i.Name)
            .ToListAsync(ct);

        if (!orderedIngredients.Any()) {
            return new Dictionary<string, List<Ingredient>>();
        }

        return orderedIngredients
            .GroupAlphabetically()
            .ToDictionary(grouping => grouping.Key, grouping => grouping.ToList());
    }
    
    public async Task<bool> DeleteManyAsync(List<Guid> ingredientIds, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(ingredientIds);

        var existingIngredients = await _recipeDbContext.Ingredients
            .Where(e => ingredientIds.Contains(e.Id))
            .ToListAsync(ct);

        if (!existingIngredients.Any()) {
            throw new DataException($"cannot delete any given {nameof(Ingredient)} (no existing ingredients where found with the given Ids)");
        }

        var notFoundIds = ingredientIds.Except(existingIngredients.Select(i => i.Id)).ToList();
        if (notFoundIds.Any()) {
            _logger.LogWarning(
                "some ingredients weren't found and will not be deleted. Missing Ids: ({NotFoundIds})",
                string.Join(", ", notFoundIds)
            );
        }

        _recipeDbContext.Ingredients.RemoveRange(existingIngredients);
        await _recipeDbContext.SaveChangesAsync(ct);

        return true;
    }

    public async Task AddManyAsync(List<Ingredient> ingredients, CancellationToken ct)
    {
        await _recipeDbContext.Ingredients.AddRangeAsync(ingredients.Select(i => i.State).ToList(), ct);
        await _recipeDbContext.SaveChangesAsync(ct);
    }
}
