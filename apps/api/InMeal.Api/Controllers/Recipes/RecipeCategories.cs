using InMeal.Api.DTOs.Recipes;
using InMeal.Api.Mappers;
using InMeal.Infrastructure.Interfaces.QueryServices;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Api.Controllers.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipeCategories : ControllerBase
{
    private readonly IAsyncRecipeCategoryQueryService _queryService;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipeCategories(ICancellationTokenAccessor cancellationTokenAccessor,
        IAsyncRecipeCategoryQueryService queryService)
    {
        _tokenAccessor = cancellationTokenAccessor;
        _queryService = queryService;
    }

    [HttpGet("[action]", Name = "View all recipe categories")]
    [ActionName("all")]
    public ActionResult<List<RecipeCategoryDto>> Get(int? skip, int? take)
    {
        var result = _queryService.GetRecipeCategoriesAsync(skip, take, _tokenAccessor.Token)
                                  .GetAwaiter()
                                  .GetResult();

        return result.Count == 0
            ? Ok(new())
            : Ok(result.Select(RecipeCategoryMapper.ToDto).ToList());
    }
}