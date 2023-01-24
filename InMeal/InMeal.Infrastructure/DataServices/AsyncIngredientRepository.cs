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
    public async Task<Guid> AddOrGetExistingIngredientAsync(string name, CancellationToken ct)
    {
        var existingIngredient = await _recipeDbContext.Ingredients.FirstOrDefaultAsync(i => i.Name == name.ToLowerInvariant(), ct);

        if (existingIngredient != null) {
            return existingIngredient.Id;
        }

        var result = await _recipeDbContext.Ingredients.AddAsync(new() {Name = name.ToLowerInvariant()}, ct);

        await _recipeDbContext.SaveChangesAsync(ct);

        return result.Entity.Id;
    }
}
