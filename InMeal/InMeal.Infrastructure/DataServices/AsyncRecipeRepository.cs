using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
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

    public async Task<Guid?> AddRecipeAsync(string? title, string? blurb, string? prepSteps, int? cookTime, int? prepTime,
        List<RecipeIngredientDto> recipeIngredients,
        CancellationToken ct)
    {
        var recipe = new Recipe(title, blurb, prepSteps, cookTime, prepTime);

        try {
            await _recipeDbContext.Recipes.AddAsync(recipe, ct);

            AddRecipeIngredients(recipe, recipeIngredients);
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
        return _recipeDbContext.Recipes.Take(50).ToListAsync(ct);
    }

    public Task<List<Recipe>> GetRecipesAsync(ICollection<Guid> ids, CancellationToken ct)
    {
        if (ids.Any(e => e.IsEmpty())) {
            throw new DataException(
                "Attempting to get recipes with empty ('00000000-0000-0000-0000-000000000000') IDs is not possible");
        }

        return _recipeDbContext.Recipes.Where(r => ids.Distinct().Contains(r.Id)).ToListAsync(ct);
    }

    public Task<Recipe?> GetRecipeAsync(Guid id, CancellationToken ct)
    {
        return id.IsEmpty()
            ? Task.FromResult<Recipe?>(null)
            : _recipeDbContext.Recipes
                .Include(r => r.RecipeIngredients)
                .ThenInclude(i => i.Ingredient)
                .FirstOrDefaultAsync(r => r.Id == id, ct);
    }

    // A dumb update method
    public async Task<bool> EditRecipeAsync(Guid recipeId, RecipeDto updatedRecipe, IReadOnlyList<RecipeIngredientDto> recipeIngredients, CancellationToken ct)
    {
        try {
            var existingRecipe = await GetRecipeAsync(recipeId, ct)
                                 ?? throw new DataException($"No {nameof(Recipe)} was found with the given ID '{recipeId}'");

            AddRecipeIngredients(existingRecipe, recipeIngredients);

            existingRecipe.Title = updatedRecipe.Title;
            existingRecipe.Blurb = updatedRecipe.Blurb;
            existingRecipe.PreparationSteps = string.Join('\n', updatedRecipe.PrepSteps);
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

    private void AddRecipeIngredients(Recipe existingRecipe, IReadOnlyList<RecipeIngredientDto> recipeIngredients)
    {
        if (recipeIngredients.Any(ri => ri.IngredientId.IsEmpty())) {
            throw new DataException(
                "Attempting to add link ingredients to a recipe with empty ID(s) ('00000000-0000-0000-0000-000000000000') is not possible");
        }

        var existingRecipeIngredients = existingRecipe.RecipeIngredients.Select(ri => ri.Id);

        var newRecipeIngredients = recipeIngredients
            // only add new ingredients
            .Where(ri => !existingRecipeIngredients.Contains(ri.IngredientId))
            .Select(ri => new RecipeIngredient {
                IngredientId = ri.IngredientId, Quantity = ri.Quantity
            })
            .ToList();

        existingRecipe.RecipeIngredients.AddRange(newRecipeIngredients);
    }
}
