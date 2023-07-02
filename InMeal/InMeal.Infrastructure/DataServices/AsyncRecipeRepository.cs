using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Infrastructure.IQueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;

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

    // public async Task<RecipeId?> AddRecipeAsync(string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime, Dictionary<Guid, RecipeIngredientDto> recipeIngredients, CancellationToken ct)
    // Recipe.UpdateIngredients(updatedRecipe.recipeIngredients)
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

    public async Task<List<Recipe>> GetAllArchivedRecipesAsync(CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Recipes
            .IncludeArchived()
            .Take(50)
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

    // Recipe.EditDetails(updatedRecipe)
    // Recipe.UpdateIngredients(updatedRecipe.recipeIngredients)
    public async Task<Recipe> EditRecipeAsync(Recipe recipe, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(recipe.RecipeIngredients.Select(identity => identity.Id.Id));

        try {
            var existingRecipe = await GetRecipeAsync(recipe.Id, ct)
                                 ?? throw new DataException($"no {nameof(Recipe)} was found with the given ID '{recipe.Id}'");

            _recipeDbContext.Recipes.Update(existingRecipe.State);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "an error occured while editing an existing recipe");
        }

        return recipe;
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
}
