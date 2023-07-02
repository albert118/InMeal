using System.Data;
using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.DataServices;

namespace InMeal.Features;

public interface IRecipeManager
{
    Task<List<Recipe>> GetRecipesAsync(CancellationToken ct);

    Task<List<Recipe>> GetRecipesAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct);

    Task<Recipe> AddRecipeAsync(Recipe dto, CancellationToken ct);

    Task<Recipe> EditRecipeAsync(RecipeDto dto, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class RecipeManager : IRecipeManager
{
    private readonly IAsyncRecipeRepository _recipeRepository;

    public RecipeManager(IAsyncRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    public async Task<List<Recipe>> GetRecipesAsync(CancellationToken ct)
    {
        return await _recipeRepository.GetRecipesAsync(ct);
    }

    public async Task<List<Recipe>> GetRecipesAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct)
    {
        return await _recipeRepository.GetRecipesAsync(recipeIds, ct);
    }

    public async Task<Recipe> AddRecipeAsync(Recipe recipe, CancellationToken ct)
    {
        await _recipeRepository.AddRecipeAsync(recipe, ct);
        return recipe;
    }

    public async Task<Recipe> EditRecipeAsync(RecipeDto dto, CancellationToken ct)
    {
        var recipe = await _recipeRepository.GetRecipeAsync(dto.Id!, ct) 
            ?? throw new DataException($"no {nameof(Recipe)} was found with the given ID '{dto.Id}'");

        recipe.EditDetails(dto);
        recipe.UpdateIngredients(dto.RecipeIngredients);

        await _recipeRepository.EditRecipeAsync(recipe, ct);
        return recipe;
    }
}