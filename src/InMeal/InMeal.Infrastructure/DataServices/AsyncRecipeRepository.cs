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
    private readonly IAsyncRecipeIngredientRepository _recipeIngredientRepository;

    public AsyncRecipeRepository(IRecipeDbContext recipeDbContext,
        IAsyncRecipeIngredientRepository recipeIngredientRepository,
        ILogger<AsyncRecipeRepository> logger)
    {
        _recipeDbContext = recipeDbContext;
        _recipeIngredientRepository = recipeIngredientRepository;
        _logger = logger;
    }

    public async Task<Guid?> AddRecipeAsync(string? title, string? blurb, string? prepSteps, int? cookTime, int? prepTime,
        List<AddRecipeIngredientDto> recipeIngredients,
        CancellationToken ct)
    {
        var recipe = new Recipe(title, blurb, prepSteps, cookTime, prepTime);

        try {
            await _recipeDbContext.Recipes.AddAsync(recipe, ct);

            _recipeIngredientRepository.AddRecipeIngredients(recipe, recipeIngredients);
            // _recipePhotoRepository.AddRecipePhoto(recipe, recipePhoto);

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
