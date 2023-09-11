using System.Data;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.DTOs.Recipes;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;

namespace InMeal.Features.Recipes;

public interface IRecipeManager
{
    Task<Dictionary<MealCourse, List<Recipe>>> GetGroupedByMealCourseAsync(bool includeArchived, CancellationToken ct);

    Task<List<Recipe>> GetManyAsync(IEnumerable<RecipeId> recipeIds, CancellationToken ct);

    Task<Recipe?> GetAsync(RecipeId recipeId, CancellationToken ct);

    Task<Recipe> AddAsync(RecipeDto dto, CancellationToken ct);

    Task<Recipe> EditAsync(EditRecipeDto dto, CancellationToken ct);

    Task ArchiveAsync(IEnumerable<RecipeId> ids, CancellationToken ct);
    
    Task RestoreAsync(IEnumerable<RecipeId> ids, CancellationToken ct);

    Task<RecipeCategoryId> AddCategoryAsync(RecipeId recipeId, Cuisine cuisineType, CancellationToken ct);

    Task RemoveCategoriesAsync(IEnumerable<RecipeId> ids, CancellationToken ct);

    RecipeMetaDto GetMeta();
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

    public Task<Dictionary<MealCourse, List<Recipe>>> GetGroupedByMealCourseAsync(bool includeArchived, CancellationToken ct)
    {
        return _recipeRepository.GetManyGroupedByMealCourseAsync(includeArchived, ct);
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

        var newRecipe = new Recipe(dto.Title, dto.Blurb, dto.PreparationSteps);

        if (!await _recipeRepository.IsRecipeTitleUnique(newRecipe.Title, ct))
            throw new RecipeUniqueTitleException($"A recipe should have a unique title ('{dto.Title}' has already been used)");

        newRecipe.EditMeta(dto.Course, dto.Type, dto.PrepTime, dto.CookTime, dto.Servings);
        newRecipe.AddCategory(dto.Category);
        newRecipe.UpdateIngredients(RecipeIngredientMapper.FromDto(dto.RecipeIngredients, newRecipe.Id));
        await _recipeRepository.AddRecipeAsync(newRecipe, ct);

        return newRecipe;
    }

    public async Task<Recipe> EditAsync(EditRecipeDto dto, CancellationToken ct)
    {
        var key = new RecipeId(dto.Id);
        var recipe = await _recipeRepository.GetRecipeAsync(key, ct)
                     ?? throw new DataException($"no {nameof(Recipe)} was found with the given ID '{key}'");

        recipe.EditDetails(dto.Title, dto.Blurb, dto.PreparationSteps);
        recipe.UpdateIngredients(RecipeIngredientMapper.FromDto(dto.RecipeIngredients, recipe.Id));
        recipe.EditMeta(dto.Course, dto.Type, dto.PrepTime, dto.CookTime, dto.Servings);
        recipe.AddCategory(dto.Category);

        await _recipeRepository.EditRecipeAsync(recipe, ct);

        return recipe;
    }

    public Task ArchiveAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        return _recipeRepository.ArchiveRecipesAsync(ids, ct);
    }

    public Task RestoreAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        return _recipeRepository.RestoreRecipesAsync(ids, ct);
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

    public RecipeMetaDto GetMeta()
    {
        return new(
            Courses: Enum.GetValues<MealCourse>().ToDictionary(e => (int)e, e => e),
            Types: Enum.GetValues<MealType>().ToDictionary(e => (int)e, e => e),
            Categories: Enum.GetValues<Cuisine>().ToDictionary(e => (int)e, e => e)
        );
    }
}