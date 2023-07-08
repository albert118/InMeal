using System.Data;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;

namespace InMeal.Features.Recipes;

public interface IRecipeManager
{
    Task<List<Recipe>> GetManyAsync(CancellationToken ct);

    Task<List<Recipe>> GetManyAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct);

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
    private readonly IAsyncRecipeRepository _recipeRepository;

    private const int DefaultTake = 25;

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

    public async Task<Recipe> AddAsync(RecipeDto dto, CancellationToken ct)
    {
        var newRecipe = new Recipe(
            dto.Title,
            dto.Blurb,
            dto.PreparationSteps,
            dto.CookTime,
            dto.PrepTime
        );

        newRecipe.UpdateIngredients(dto.RecipeIngredients);
        await _recipeRepository.AddRecipeAsync(newRecipe, ct);

        return newRecipe;
    }

    public async Task<Recipe> EditAsync(RecipeDto dto, CancellationToken ct)
    {
        var recipe = await _recipeRepository.GetRecipeAsync(dto.Id!, ct) 
            ?? throw new DataException($"no {nameof(Recipe)} was found with the given ID '{dto.Id}'");

        recipe.EditDetails(dto.Title, dto.Blurb, dto.PreparationSteps, dto.PrepTime, dto.CookTime);
        recipe.UpdateIngredients(dto.RecipeIngredients);

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

        recipe.AddCategory(cuisineType);
        await _recipeRepository.UpdateRecipesAsync(new List<Recipe> { recipe }, ct);

        return recipe.Category.Id;
    }

    public async Task RemoveCategoriesAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        var recipes = await _recipeRepository.GetRecipesAsync(ids, ct);

        foreach (var recipe in recipes) {
            recipe.RemoveCategory();
        }

        await _recipeRepository.UpdateRecipesAsync(recipes, ct);
    }
}