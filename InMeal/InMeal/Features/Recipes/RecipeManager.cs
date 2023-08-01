using System.Data;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.DTOs.Recipes;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;

namespace InMeal.Features.Recipes;

public interface IRecipeManager
{
    Task<List<Recipe>> GetManyAsync(CancellationToken ct);

    Task<List<Recipe>> GetManyAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct);

    Task<Recipe?> GetAsync(RecipeId recipeId, CancellationToken ct);

    Task<Recipe> AddAsync(RecipeDto dto, CancellationToken ct);

    Task<Recipe> EditAsync(RecipeDto dto, CancellationToken ct);

    Task<List<Recipe>> GetArchivedAsync(int? take, int? skip, CancellationToken ct);

    Task ArchiveAsync(IEnumerable<RecipeId> ids, CancellationToken ct);

    Task<RecipeCategoryId> AddCategoryAsync(RecipeId recipeId, Cuisine cuisineType, CancellationToken ct);

    Task RemoveCategoriesAsync(IEnumerable<RecipeId> ids, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class RecipeManager : IRecipeManager
{
    private const int DefaultTake = 25;
    private readonly IAsyncRecipeRepository _recipeRepository;

    public RecipeManager(IAsyncRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    public Task<List<Recipe>> GetManyAsync(CancellationToken ct)
    {
        return _recipeRepository.GetRecipesAsync(ct);
    }

    public Task<List<Recipe>> GetManyAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct)
    {
        return _recipeRepository.GetRecipesAsync(recipeIds, ct);
    }

    public Task<Recipe?> GetAsync(RecipeId recipeId, CancellationToken ct)
    {
        return _recipeRepository.GetRecipeAsync(recipeId, ct);
    }

    public async Task<Recipe> AddAsync(RecipeDto dto, CancellationToken ct)
    {
        if (dto.Id != null) throw new ArgumentException("A new recipe shouldn't have an ID yet (an ID was provided)");

        var newRecipe = new Recipe(
            dto.Title,
            dto.Blurb,
            dto.PreparationSteps,
            dto.CookTime,
            dto.PrepTime
        );

        newRecipe.UpdateIngredients(RecipeIngredientMapper.FromDto(dto.RecipeIngredients, newRecipe.Id));
        await _recipeRepository.AddRecipeAsync(newRecipe, ct);

        return newRecipe;
    }

    public async Task<Recipe> EditAsync(RecipeDto dto, CancellationToken ct)
    {
        if (!dto.Id.HasValue) throw new ArgumentException("An ID is required to edit an existing recipe");

        var key = new RecipeId(dto.Id.Value);
        var recipe = await _recipeRepository.GetRecipeAsync(key, ct)
                     ?? throw new DataException($"no {nameof(Recipe)} was found with the given ID '{key}'");

        recipe.EditDetails(dto.Title, dto.Blurb, dto.PreparationSteps, dto.PrepTime, dto.CookTime);
        recipe.UpdateIngredients(RecipeIngredientMapper.FromDto(dto.RecipeIngredients, recipe.Id));

        await _recipeRepository.EditRecipeAsync(recipe, ct);

        return recipe;
    }

    public Task<List<Recipe>> GetArchivedAsync(int? take, int? skip, CancellationToken ct)
    {
        return _recipeRepository.GetAllArchivedRecipesAsync(take ?? DefaultTake, skip ?? 0, ct);
    }

    public Task ArchiveAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        return _recipeRepository.ArchiveRecipesAsync(ids, ct);
    }

    public async Task<RecipeCategoryId> AddCategoryAsync(RecipeId recipeId, Cuisine cuisineType, CancellationToken ct)
    {
        var recipe = await _recipeRepository.GetRecipeAsync(recipeId, ct)
                     ?? throw new DataException($"no {nameof(Recipe)} was found with the given ID '{recipeId}'");

        var categoryId = recipe.AddCategory(cuisineType);
        await _recipeRepository.UpdateRecipesAsync(new List<Recipe> { recipe }, ct);

        return categoryId;
    }

    public async Task RemoveCategoriesAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        var recipes = await _recipeRepository.GetRecipesAsync(ids, ct);

        foreach (var recipe in recipes) recipe.RemoveCategory();

        await _recipeRepository.UpdateRecipesAsync(recipes, ct);
    }
}