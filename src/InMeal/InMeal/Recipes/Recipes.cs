using InMeal.Core.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly ILogger<RecipesController> _logger;
    private readonly IAsyncRecipeRepository _repository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipesController(IAsyncRecipeRepository repository, ILogger<RecipesController> logger,
        ICancellationTokenAccessor tokenAccessor)
    {
        _repository = repository;
        _logger = logger;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "View All Recipes")]
    public List<RecipeDto> Post(ICollection<Guid> ids)
    {
        var ct = _tokenAccessor.Token;
        var task = _repository.GetRecipesAsync(ids, ct);
        task.Wait(ct);

        if (task.Result.Count == 0) {
            return new();
        }

        return task.Result.Select(r => new RecipeDto(
            r.Id,
            r.Title ?? "NO TITLE YIKES",
            r.Blurb,
            r.PreparationSteps.Split(';').ToList(), // todo while testing and mucking around
            r.CookTime,
            r.PrepTime,
            r.RecipeIngredients
                .Select(ri => new AddRecipeIngredientDto(ri.Ingredient.Name, ri.Id, ri.Quantity))
                .ToList()
        )).ToList();
    }
}
