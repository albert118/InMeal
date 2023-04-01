using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
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

    public async Task<Guid?> AddRecipeAsync(string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime, Dictionary<Guid, RecipeIngredientDto> recipeIngredients, CancellationToken ct)
    {
        var recipe = new Recipe(title, blurb, preparationSteps, cookTime, prepTime);

        try {
            await _recipeDbContext.Recipes.AddAsync(recipe, ct);

            UpdateRecipeIngredients(recipe, recipeIngredients);
            // _recipePhotoRepository.AddRecipePhoto(recipe, recipePhoto);

            await _recipeDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An error occured while saving a recipe");

            return null;
        }

        return recipe.Id;
    }

    public Task<List<Recipe>> GetRecipesAsync(CancellationToken ct)
    {
        return _recipeDbContext.Recipes
            .ExcludeArchived()
            .Take(50)
            .ToListAsync(ct);
    }

    public Task<List<Recipe>> GetAllArchivedRecipesAsync(CancellationToken ct)
    {
        return _recipeDbContext.Recipes
            .IncludeArchived()
            .Take(50)
            .ToListAsync(ct);
    }

    public Task<List<Recipe>> GetRecommendedRecipes(int limit, CancellationToken ct)
    {
        return _recipeDbContext.Recipes
            .ExcludeArchived()
            .OrderRandomly()
            .Take(limit)
            .ToListAsync(ct);
    }

    public Task<List<Recipe>> GetRecipesAsync(ICollection<Guid> ids, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(ids);

        return _recipeDbContext.Recipes
            .Where(r => ids.Distinct().Contains(r.Id))
            .ExcludeArchived()
            .ToListAsync(ct);
    }

    public Task<Recipe?> GetRecipeAsync(Guid id, CancellationToken ct)
    {
        return id.IsEmpty()
            ? Task.FromResult<Recipe?>(null)
            : _recipeDbContext.Recipes
                .Include(r => r.RecipeIngredients)
                .ThenInclude(i => i.Ingredient)
                .ExcludeArchived()
                .FirstOrDefaultAsync(r => r.Id == id, ct);
    }

    // A dumb update method
    public async Task<bool> EditRecipeAsync(RecipeDto updatedRecipe, CancellationToken ct)
    {
        if (!updatedRecipe.Id.HasValue) {
            throw new DataException($"Can not get {nameof(Recipe)} without an ID ");
        }

        try {
            var existingRecipe = await GetRecipeAsync(updatedRecipe.Id.Value, ct)
                ?? throw new DataException($"No {nameof(Recipe)} was found with the given ID '{updatedRecipe.Id.Value}'");

            UpdateRecipeIngredients(existingRecipe, updatedRecipe.RecipeIngredients);

            existingRecipe.Title = updatedRecipe.Title;
            existingRecipe.Blurb = updatedRecipe.Blurb;
            existingRecipe.PreparationSteps = updatedRecipe.PreparationSteps;
            existingRecipe.PrepTime = updatedRecipe.PrepTime;
            existingRecipe.CookTime = updatedRecipe.CookTime;

            _recipeDbContext.Recipes.Update(existingRecipe);
            await _recipeDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An error occured while editing an existing recipe");
            return false;
        }

        return true;
    }

    public async Task ArchiveRecipesAsync(List<Guid> ids, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(ids);

        var recipesToArchive = await _recipeDbContext.Recipes
            .Where(r => ids.Distinct().Contains(r.Id))
            .ExcludeArchived()
            .ToListAsync(ct);

        foreach (var recipe in recipesToArchive) {
            recipe.isArchived = true;
        }

        await _recipeDbContext.SaveChangesAsync(ct);
    }

    private void UpdateRecipeIngredients(Recipe existingRecipe, IReadOnlyDictionary<Guid, RecipeIngredientDto> recipeIngredients)
    {
        if (!recipeIngredients.Keys.Any()) {
            existingRecipe.RecipeIngredients = new();
            return;
        }

        EmptyGuidGuard.Apply(recipeIngredients.Keys);

        // TODO fix this and make it clever
        // Will fail an FK constraint when replacing with existing (ef core will think new associations exist)
        existingRecipe.RecipeIngredients = recipeIngredients
            .Select(ri => new RecipeIngredient {
                IngredientId = ri.Key, Quantity = ri.Value.Quantity
            })
            .ToList();
    }
}
