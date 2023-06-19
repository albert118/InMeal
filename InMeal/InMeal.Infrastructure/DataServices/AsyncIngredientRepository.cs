using System.Text.RegularExpressions;
using InMeal.Core.Entities;
using InMeal.Core.Extensions;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncIngredientRepository : IAsyncIngredientRepository
{
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncIngredientRepository(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
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
