using InMeal.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Upcoming;

[ApiController]
[Route("api/[controller]")]
public class UpcomingController
{
    private readonly IRecommendedRecipesService _recommendedRecipesService;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public UpcomingController(IRecommendedRecipesService recommendedRecipesService, ICancellationTokenAccessor tokenAccessor)
    {
        _recommendedRecipesService = recommendedRecipesService;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "Recommended Recipes")]
    public List<RecommendedRecipe> Post()
    {
        var ct = _tokenAccessor.Token;
        var task = _recommendedRecipesService.GetRecommendedRecipesAsync(ct);
        task.Wait(ct);

        return task.Result.Count == 0 ? new() : task.Result;
    }
}
