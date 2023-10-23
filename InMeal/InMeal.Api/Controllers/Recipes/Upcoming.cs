using InMeal.Api.DTOs.Recipes;
using InMeal.Api.Features.Upcoming;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Api.Controllers.Recipes;

[ApiController]
[Route("api/[controller]/[action]")]
public class UpcomingController : ControllerBase
{
    private readonly IRecommendedRecipesService _recommendedRecipesService;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public UpcomingController(IRecommendedRecipesService recommendedRecipesService,
        ICancellationTokenAccessor tokenAccessor)
    {
        _recommendedRecipesService = recommendedRecipesService;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "Recommended Recipes")]
    [ActionName("recommended")]
    public ActionResult<List<RecommendedRecipe>> Post()
    {
        var results = _recommendedRecipesService.GetRecommended(_tokenAccessor.Token)
                                                .GetAwaiter()
                                                .GetResult();

        return !results.Any() ? NoContent() : Ok(results);
    }
}