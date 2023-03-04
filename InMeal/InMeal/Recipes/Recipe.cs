using InMeal.Core.DTOs;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly ILogger<RecipeController> _logger;
    private readonly IAsyncRecipeRepository _recipeRepository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipeController(ILogger<RecipeController> logger, IAsyncRecipeRepository recipeRepository, ICancellationTokenAccessor tokenAccessor)
    {
        _logger = logger;
        _recipeRepository = recipeRepository;
        _tokenAccessor = tokenAccessor;
    }

    [HttpGet(Name = "View Recipe")]
    public RecipeDto? Get(Guid id)
    {
        var ct = _tokenAccessor.Token;
        var task = _recipeRepository.GetRecipeAsync(id, ct);
        task.Wait(ct);

        return task.Result == null ? null : RecipeMapper.ToDto(task.Result);
    }

    [HttpPost(Name = "Add Recipe")]
    public Guid Post(RecipeDto dto)
    {
        var ct = _tokenAccessor.Token;

        var task = _recipeRepository.AddRecipeAsync(
            dto.Title,
            dto.Blurb,
            dto.PreparationSteps,
            dto.CookTime,
            dto.PrepTime,
            dto.RecipeIngredients,
            ct
        );

        task.Wait(ct);

        if (!task.Result.HasValue) {
            throw new BadHttpRequestException("Couldn't add the recipe");
        }

        return task.Result.Value;
    }

    [HttpPatch(Name = "Edit Recipe")]
    public async Task<IActionResult> Patch(RecipeDto dto)
    {
        if (dto.Id.IsNullOrEmpty()) {
            _logger.LogWarning("Attempted to edit a recipe without an ID (did you forget to pass the ID?)");
            return BadRequest("An ID is required to edit an existing recipe");
        }

        var ct = _tokenAccessor.Token;

        var wasSuccessful = await _recipeRepository.EditRecipeAsync(dto.Id!.Value, dto, dto.RecipeIngredients, ct);

        return !wasSuccessful ?  BadRequest() : Ok();
    }
}
