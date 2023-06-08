using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Core.Mappers;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipeCategories : ControllerBase
{
    private readonly IAsyncRecipeCategoryRepository _recipeCategoryRepository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipeCategories(IAsyncRecipeCategoryRepository recipeCategoryRepository, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _recipeCategoryRepository = recipeCategoryRepository;
        _tokenAccessor = cancellationTokenAccessor;
    }

    [HttpGet("[action]", Name = "View all recipe categories")]
    [ActionName("all")]
    public ActionResult<List<RecipeCategoryDto>> Get(int? skip, int? take)
    {
        var ct = _tokenAccessor.Token;
        var task = _recipeCategoryRepository.GetRecipeCategoriesAsync(skip ?? 0, take ?? 25, ct);
        task.Wait(ct);

        return task.Result.Count == 0
            ? Ok(new())
            : Ok(task.Result.Select(RecipeCategoryMapper.MapToDto).ToList());
    }

    [HttpPost("[action]", Name = "Add a new recipe category for a given recipe")]
    [ActionName("add")]
    public IActionResult Get(AddRecipeCategoryDto dto)
    {
        var ct = _tokenAccessor.Token;
        var task = _recipeCategoryRepository.AddRecipeCategoryAsync(dto, ct);

        task.Wait(ct);

        if (!task.Result.HasValue) {
            throw new BadHttpRequestException($"Couldn't add the {nameof(RecipeCategory)}");
        }

        return Ok();
    }

    [HttpDelete("[action]", Name = "Remove recipe categories for the given recipes")]
    [ActionName("remove")]
    public IActionResult Delete(List<Guid> recipeIds)
    {
        var ct = _tokenAccessor.Token;
        var task = _recipeCategoryRepository.DeleteRecipeCategoriesByRecipeIdAsync(recipeIds, ct);

        task.Wait(ct);

        if (!task.Result) {
            throw new BadHttpRequestException($"Couldn't add the {nameof(RecipeCategory)}");
        }

        return Ok();
    }
}
