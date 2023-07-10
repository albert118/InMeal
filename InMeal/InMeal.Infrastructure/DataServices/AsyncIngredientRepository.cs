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

    public async Task UpdateAsync(List<Ingredient> ingredients, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(ingredients.Select(r => r.Id.Key));

        _recipeDbContext.Ingredients.UpdateRange(ingredients.Select(i => i.State));
        await _recipeDbContext.SaveChangesAsync(ct);
    }

    public async Task<List<Ingredient>> GetManyAsync(int skip, int take, CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Ingredients
            .OrderBy(i => i.Name)
            .Skip(skip)
            .Take(take)
            .ToListAsync(ct);

        return mementos.Select(Ingredient.FromMemento).ToList();
    }

    public async Task<Ingredient?> GetAsync(IngredientId id, CancellationToken ct)
    {
        var memento = await _recipeDbContext.Ingredients.SingleOrDefaultAsync(e => e.Id == id.Key, ct);
        return memento == null ? null : Ingredient.FromMemento(memento);
    }

    public async Task<List<Ingredient>> GetManyAsync(List<string> names, CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Ingredients.Where(i => names.Contains(i.Name)).ToListAsync(ct);

        return mementos.Select(Ingredient.FromMemento).ToList();
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
            .ToDictionary(grouping => grouping.Key, grouping => grouping.Select(Ingredient.FromMemento).ToList());
    }
    
    public async Task<bool> DeleteManyAsync(IEnumerable<IngredientId> ingredientIds, CancellationToken ct)
    {
        var keys = ingredientIds.Select(identity => identity.Key).ToList();
        EmptyGuidGuard.Apply(keys);

        var existingIngredients = await _recipeDbContext.Ingredients
            .Where(e => keys.Contains(e.Id))
            .ToListAsync(ct);

        if (!existingIngredients.Any()) {
            _logger.LogWarning(
                "no {Ingredient}s were deleted with the given Ids", 
                nameof(Ingredient)
            );
        }

        var notFoundIds = keys.Except(existingIngredients.Select(i => i.Id)).ToList();
        if (notFoundIds.Any()) {
            _logger.LogWarning(
                "some {Ingredient}s weren't found and will not be deleted (missing Ids '{NotFoundIds}')",
                nameof(Ingredient),
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
