using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncIngredientRepository : IAsyncIngredientRepository
{
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncIngredientRepository(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
    }

    public Task<List<Ingredient>> GetIngredientsAsync(ICollection<Guid> ids, CancellationToken ct)
    {
        if (ids.Any(e => e.IsEmpty())) {
            throw new DataException(
                "Attempting to get ingredients with empty ('00000000-0000-0000-0000-000000000000') IDs is not possible");
        }

        return _recipeDbContext.Ingredients.Where(i => ids.Contains(i.Id)).ToListAsync(ct);
    }

    // enforce lower case names for ingredients
    public async Task<List<Ingredient>> AddOrGetExistingIngredientsAsync(List<string> names, CancellationToken ct)
    {
        var existingIngredients = await GetIngredientsByNameAsync(names, ct);
        var returnValue = existingIngredients.ToList();
        var ingredientNamesToAdd = existingIngredients.Select(i => i.Name).Except(names).ToList();

        // skip adding any new ingredients, as we have persisted them all already
        if (!ingredientNamesToAdd.Any())
            return returnValue;

        var newIngredientIds = await AddNewIngredientsAsync(ingredientNamesToAdd, ct);
        returnValue.AddRange(newIngredientIds);

        return returnValue;
    }

    public Task<List<Ingredient>> GetIngredientOptionsAsync(CancellationToken ct)
    {
        return _recipeDbContext.Ingredients
            .OrderBy(i => i.Name)
            .Take(25)
            .ToListAsync(ct);
    }

    private async Task<List<Ingredient>> GetIngredientsByNameAsync(List<string> names, CancellationToken ct)
    {
        return await _recipeDbContext.Ingredients
            .Where(i => names.Contains(i.Name.ToLowerInvariant()))
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
