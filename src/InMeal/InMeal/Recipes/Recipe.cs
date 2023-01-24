using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly ILogger<RecipeController> _logger;
    private readonly IAsyncRecipeIngredientRepository _recipeIngredientRepository;
    private readonly IAsyncRecipeRepository _recipeRepository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipeController(IAsyncRecipeRepository recipeRepository, IAsyncRecipeIngredientRepository recipeIngredientRepository, ILogger<RecipeController> logger,
        ICancellationTokenAccessor tokenAccessor)
    {
        _recipeRepository = recipeRepository;
        _recipeIngredientRepository = recipeIngredientRepository;
        _logger = logger;
        _tokenAccessor = tokenAccessor;
    }

    [HttpGet(Name = "View Recipe")]
    public RecipeDto? Get(Guid id)
    {
        var ct = _tokenAccessor.Token;
        var task = _recipeRepository.GetRecipeAsync(id, ct);
        task.Wait(ct);

        if (task.Result == null)
            return null;

        return new(
            task.Result.Id,
            task.Result.Title ?? "NO TITLE YIKES",
            task.Result.Blurb,
            task.Result.PreparationSteps.Split('\n').ToList(),
            task.Result.CookTime,
            task.Result.PrepTime,
            task.Result.RecipeIngredients
                .Select(ri => new RecipeIngredientDto(ri.Ingredient.Name, ri.Id, ri.Quantity))
                .ToList()
        );
    }

    [HttpPost(Name = "Add Recipe")]
    public IActionResult Post(RecipeDto dto)
    {
        var ct = _tokenAccessor.Token;
        var task = _recipeRepository.AddRecipeAsync(
            dto.Title,
            dto.Blurb,
            dto.PrepSteps.ToString(),
            dto.CookTime,
            dto.PrepTime,
            dto.RecipeIngredientDtos,
            ct
        );

        task.Wait(ct);

        return !task.Result.HasValue ? BadRequest(task.Result!.Value) : Ok();
    }

    [HttpPatch(Name = "Edit Recipe")]
    public async Task<IActionResult> Patch(RecipeDto dto)
    {
        if (dto.Id.IsNullOrEmpty()) {
            _logger.LogWarning("Attempted to edit a recipe without an ID (did you forget to pass the ID?)");
            return BadRequest("An ID is required to edit an existing recipe");
        }

        var ct = _tokenAccessor.Token;

        var existingRecipe = await _recipeRepository.GetRecipeAsync(dto.Id!.Value, ct)
                             ?? throw new DataException($"No {nameof(Recipe)} was found with the given ID '{dto.Id!.Value}'");

        var wasSuccessful = await _recipeRepository.EditRecipeAsync(
            existingRecipe,
            dto.RecipeIngredientDtos,
            ct
        );

        return !wasSuccessful ?  BadRequest() : Ok();
    }
}
