using System.Data;
using InMeal.Core.Entities;
using InMeal.Core.Extensions;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Infrastructure.IQueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Repositories;

public class AsyncIngredientRepository : IAsyncIngredientRepository
{
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncIngredientRepository(IRecipeDbContext recipeDbContext)
    {
        _recipeDbContext = recipeDbContext;
    }

    public async Task UpdateAsync(Ingredient ingredient, CancellationToken ct)
    {
        var existingIngredient = await _recipeDbContext.Ingredients.SingleOrDefaultAsync(e => e.Id == ingredient.Id.Key, ct) 
            ?? throw new DataException($"cannot find the given {nameof(Ingredient)} with Id '{ingredient.Id}'");

        _recipeDbContext.Entry(existingIngredient).CurrentValues.SetValues(ingredient.State);
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

    public async Task<List<Ingredient>> GetManyAsync(List<IngredientId> ids, CancellationToken ct)
    {
        var keys = ids.Select(key => key.Key).ToHashSet();
        var mementos = await _recipeDbContext.Ingredients.Where(i => keys.Contains(i.Id)).ToListAsync(ct);

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
    
    public async Task DeleteManyAsync(List<IngredientId> ingredientIds, CancellationToken ct)
    {
        var keys = ingredientIds.Select(id => id.Key).ToList();
        var existingIngredients = await _recipeDbContext.Ingredients.Where(e => keys.Contains(e.Id)).ToListAsync(ct);

        _recipeDbContext.Ingredients.RemoveRange(existingIngredients);
        await _recipeDbContext.SaveChangesAsync(ct);
    }

    public async Task<bool> IsIngredientNameUnique(string name, CancellationToken ct)
    {
        var countWithGivenName = await _recipeDbContext.Ingredients
           .Where(r => r.Name == name)
           .ExcludeArchived()
           .CountAsync(ct);

        return countWithGivenName == 0;
    }

    public async Task AddManyAsync(List<Ingredient> ingredients, CancellationToken ct)
    {
        await _recipeDbContext.Ingredients.AddRangeAsync(ingredients.Select(i => i.State).ToList(), ct);
        await _recipeDbContext.SaveChangesAsync(ct);
    }
}
