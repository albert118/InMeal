using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IAsyncRecipeDataService _dataService;
    private readonly ILogger<RecipesController> _logger;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipesController(IAsyncRecipeDataService dataService, ILogger<RecipesController> logger,
        ICancellationTokenAccessor tokenAccessor)
    {
        _dataService = dataService;
        _logger = logger;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "View All Recipes")]
    public List<RecipeDto> Post(ICollection<Guid> ids)
    {
        var ct = _tokenAccessor.Token;
        var task = _dataService.GetRecipesAsync(ids, ct);
        task.Wait(ct);

        if (task.Result.Count == 0) {
            return new();
        }

        return task.Result.Select(r => new RecipeDto(
            r.Id,
            r.Title ?? "NO TITLE YIKES",
            r.Blurb,
            r.PreparationSteps,
            r.CookTime,
            r.PrepTime
        )).ToList();
    }
}
