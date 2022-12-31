using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly IAsyncRecipeDataService _dataService;
    private readonly ILogger<RecipeController> _logger;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipeController(IAsyncRecipeDataService dataService, ILogger<RecipeController> logger,
        ICancellationTokenAccessor tokenAccessor)
    {
        _dataService = dataService;
        _logger = logger;
        _tokenAccessor = tokenAccessor;
    }

    [HttpGet(Name = "View Recipe")]
    public RecipeDto? Get(Guid id)
    {
        var ct = _tokenAccessor.Token;
        var task = _dataService.GetRecipeAsync(id, ct);
        task.Wait(ct);

        if (task.Result == null) {
            return null;
        }

        return new(
            task.Result.Id,
            task.Result.Title ?? "NO TITLE YIKES",
            task.Result.Blurb,
            task.Result.PreparationSteps,
            task.Result.CookTime,
            task.Result.PrepTime
        );
    }

    [HttpPost(Name = "Add Recipe")]
    public IActionResult Post(RecipeDto newRecipe)
    {
        var ct = _tokenAccessor.Token;
        var task = _dataService.AddRecipeAsync(
            newRecipe.Title,
            newRecipe.Blurb,
            newRecipe.PrepSteps,
            newRecipe.PrepTime,
            newRecipe.CookTime,
            ct
        );

        task.Wait(ct);

        return !task.Result.HasValue ? BadRequest(task.Result!.Value) : Ok();
    }

    [HttpPatch(Name = "Edit Recipe")]
    public IActionResult Patch(RecipeDto newRecipe)
    {
        if (newRecipe.Id.IsNullOrEmpty()) {
            _logger.LogWarning("Attempted to edit a recipe without an ID (did you forget to pass the ID?)");
            return BadRequest("An ID is required to edit an existing recipe");
        }

        var ct = _tokenAccessor.Token;
        var task = _dataService.EditRecipeAsync(
            newRecipe.Id!.Value,
            newRecipe.Title,
            newRecipe.Blurb,
            newRecipe.PrepSteps,
            newRecipe.CookTime,
            newRecipe.PrepTime,
            ct
        );

        task.Wait(ct);

        return !task.Result ? BadRequest() : Ok();
    }
}
