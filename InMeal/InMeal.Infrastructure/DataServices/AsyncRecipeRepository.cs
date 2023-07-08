using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Infrastructure.IQueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncRecipeRepository : IAsyncRecipeRepository
{
    private readonly ILogger<AsyncRecipeRepository> _logger;
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeRepository(IRecipeDbContext recipeDbContext, ILogger<AsyncRecipeRepository> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public async Task<RecipeId?> AddRecipeAsync(Recipe recipe, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(recipe.RecipeIngredients.Select(identity => identity.Id.Id));

        try {
            await _recipeDbContext.Recipes.AddAsync(recipe.State, ct);
        } catch (Exception ex) {
            _logger.LogError(ex, "an error occured while saving a recipe");
            return null;
        }

        return recipe.Id;
    }

    public async Task<List<Recipe>> GetRecipesAsync(CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Recipes
            .ExcludeArchived()
            .Take(50)
            .ToListAsync(ct);
            
        return mementos.Select(Recipe.FromMemento).ToList();
    }

    public async Task<List<Recipe>> GetAllArchivedRecipesAsync(int take, int skip, CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Recipes
            .IncludeArchived()
            .Skip(skip)
            .Take(take)
            .ToListAsync(ct);

        return mementos.Select(Recipe.FromMemento).ToList();
    }

    public async Task<List<Recipe>> GetRecommendedRecipes(int limit, CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Recipes
            .ExcludeArchived()
            .OrderRandomly()
            .Take(limit)
            .ToListAsync(ct);

        return mementos.Select(Recipe.FromMemento).ToList(); 
    }

    public async Task<List<Recipe>> GetRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        var keys = ids.Select(identity => identity.Id).Distinct().ToList();
        EmptyGuidGuard.Apply(keys);

        var mementos = await _recipeDbContext.Recipes
            .Where(r => keys.Contains(r.Id))
            .ExcludeArchived()
            .ToListAsync(ct);

        return mementos.Select(Recipe.FromMemento).ToList();
    }

    public async Task<Recipe?> GetRecipeAsync(RecipeId id, CancellationToken ct)
    {
        var memento = await _recipeDbContext.Recipes
                .Include(r => r.RecipeIngredients)
                .ThenInclude(i => i.Ingredient)
                .ExcludeArchived()
                .SingleOrDefaultAsync(r => r.Id == id.Id, ct);

        return memento != null ? Recipe.FromMemento(memento) : null;
    }

    public Task<Recipe> EditRecipeAsync(Recipe recipe, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(recipe.RecipeIngredients.Select(identity => identity.Id.Id));

        try {
            _recipeDbContext.Recipes.Update(recipe.State);
        } catch (Exception ex) {
            _logger.LogError(ex, "an error occured while editing an existing recipe");
        }

        return Task.FromResult(recipe);
    }

    public async Task ArchiveRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        var keys = ids.Select(identity => identity.Id).Distinct().ToList();
        EmptyGuidGuard.Apply(keys);

        var recipesToArchive = await _recipeDbContext.Recipes
            .Where(r => keys.Contains(r.Id))
            .ExcludeArchived()
            .ToListAsync(ct);

        foreach (var recipe in recipesToArchive) {
            recipe.isArchived = true;
        }
    }

    public Task SaveChangesAsync(CancellationToken ct) => _recipeDbContext.SaveChangesAsync(ct);
}
