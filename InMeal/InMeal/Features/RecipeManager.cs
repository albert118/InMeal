using System.Data;
using InMeal.Core.Entities;
using InMeal.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;

namespace InMeal.Features;

public interface IRecipeManager
{
    Task<List<Recipe>> GetManyAsync(CancellationToken ct);

    Task<List<Recipe>> GetManyAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct);

    Task<Recipe> AddAsync(RecipeDto dto, CancellationToken ct);

    Task<Recipe> EditAsync(RecipeDto dto, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class RecipeManager : IRecipeManager
{
    private readonly IAsyncRecipeRepository _recipeRepository;

    public RecipeManager(IAsyncRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    public async Task<List<Recipe>> GetManyAsync(CancellationToken ct)
    {
        return await _recipeRepository.GetRecipesAsync(ct);
    }

    public async Task<List<Recipe>> GetManyAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct)
    {
        return await _recipeRepository.GetRecipesAsync(recipeIds, ct);
    }

    public async Task<Recipe> AddAsync(RecipeDto dto, CancellationToken ct)
    {
        var newRecipe = RecipeMapper.FromDto(dto);
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
}