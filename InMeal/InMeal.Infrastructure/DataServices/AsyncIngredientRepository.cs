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

    public async Task UpdateIngredientName(Guid id, string newName, CancellationToken ct)
    {
        var existingIngredient = await _recipeDbContext.Ingredients.SingleAsync(i => i.Id == id, ct);
        existingIngredient.Name = newName;
        await _recipeDbContext.SaveChangesAsync(ct);
    }

    public Task<List<Ingredient>> GetIngredientsAsync(int skip, int take, CancellationToken ct)
    {
        return _recipeDbContext.Ingredients
            .OrderBy(i => i.Name)
            .Skip(skip)
            .Take(take)
            .ToListAsync(ct);
    }

    public async Task<List<Ingredient>> AddOrGetExistingIngredientsAsync(List<string> names, CancellationToken ct)
    {
        var existingIngredients = await GetIngredientsByNameAsync(names, ct);
        var returnValue = existingIngredients.ToList();
        var ingredientNamesToAdd = names.Except(existingIngredients.Select(i => i.Name)).ToList();

        // skip adding any new ingredients, as we have persisted them all already
        if (!ingredientNamesToAdd.Any())
            return returnValue;

        var newIngredientIds = await AddNewIngredientsAsync(ingredientNamesToAdd, ct);
        returnValue.AddRange(newIngredientIds);

        return returnValue;
    }

    public async Task<Dictionary<string, List<Ingredient>>> GetAlphabeticallyIndexedIngredientsAsync(CancellationToken ct)
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
    
    public async Task<bool> DeleteIngredientsAsync(List<Guid> ingredientIds, CancellationToken ct)
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

    private async Task<List<Ingredient>> GetIngredientsByNameAsync(List<string> names, CancellationToken ct)
    {
        return await _recipeDbContext.Ingredients
            .Where(i => names.Contains(i.Name))
            .ToListAsync(ct);
    }

    private async Task<IEnumerable<Ingredient>> AddNewIngredientsAsync(List<string> names, CancellationToken ct)
    {
        var newIngredients = names
            .Select(newIngredientName => new Ingredient() {Name = newIngredientName.ToLowerInvariant()})
            .ToList();

        await _recipeDbContext.Ingredients.AddRangeAsync(newIngredients, ct);
        await _recipeDbContext.SaveChangesAsync(ct);

        return newIngredients;
    }
}
