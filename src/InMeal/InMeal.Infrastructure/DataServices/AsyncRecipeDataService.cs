using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncRecipeDataService : IAsyncRecipeDataService
{
    private readonly ILogger<AsyncRecipeDataService> _logger;
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeDataService(IRecipeDbContext recipeDbContext, ILogger<AsyncRecipeDataService> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public async Task<Guid?> AddRecipeAsync(string? title, string? blurb, string? prepSteps, int? cookTime,
        int? prepTime, CancellationToken ct)
    {
        var recipe = new Recipe(title, blurb, prepSteps, cookTime, prepTime);

        try {
            await _recipeDbContext.Recipes.AddAsync(recipe, ct);
            await _recipeDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An error occured while saving a recipe");
            return null;
        }

        return recipe.Id;
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
            : _recipeDbContext.Recipes.FirstOrDefaultAsync(r => r.Id == id, ct);
    }

    // A dumb update method
    public async Task<bool> EditRecipeAsync(Guid id, string title, string? blurb, string prepSteps, int? cookTime,
        int? prepTime, CancellationToken ct)
    {
        if (id.IsEmpty()) {
            throw new DataException("Cannot edit a non-existent recipe (a valid ID must be passed while editing)");
        }

        var existingRecipe = await GetRecipeAsync(id, ct)
                             ?? throw new DataException($"No {nameof(Recipe)} was found with the given ID '{id}'");

        try {
            existingRecipe.Title = title;
            existingRecipe.Blurb = blurb;
            existingRecipe.PreparationSteps = prepSteps;
            existingRecipe.PrepTime = cookTime;
            existingRecipe.CookTime = prepTime;

            _recipeDbContext.Recipes.Update(existingRecipe);
            await _recipeDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An error occured while editing an existing recipe");
            return false;
        }

        return true;
    }
}
