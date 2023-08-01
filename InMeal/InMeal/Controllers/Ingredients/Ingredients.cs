using InMeal.Core.Entities;
using InMeal.DTOs.Ingredients;
using InMeal.Features.Ingredients;
using InMeal.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Controllers.Ingredients;

[ApiController]
[Route("api/[controller]/[action]")]
public class IngredientsController : ControllerBase
{
    private readonly IIngredientsManager _ingredientsManager;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public IngredientsController(IIngredientsManager ingredientsManager, ICancellationTokenAccessor tokenAccessor)
    {
        _ingredientsManager = ingredientsManager;
        _tokenAccessor = tokenAccessor;
    }

    [HttpGet(Name = "View all ingredients (paginated)")]
    [ActionName("all")]
    public ActionResult<List<IngredientDto>> Get(int? skip, int? take)
    {
        var results = _ingredientsManager.GetIngredientsAsync(skip, take, _tokenAccessor.Token)
                                         .GetAwaiter()
                                         .GetResult();

        return results.Count == 0 ? new() : results.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    [HttpPatch(Name = "Edit an ingredient")]
    [ActionName("update")]
    public IActionResult Get(EditIngredientDto dto)
    {
        _ingredientsManager.EditAsync(dto, _tokenAccessor.Token)
                           .GetAwaiter()
                           .GetResult();

        return Ok();
    }

    [HttpGet(Name = "View all alphabetically indexed ingredients")]
    [ActionName("indexed")]
    public ActionResult<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> Get()
    {
        var results = _ingredientsManager.GetUsagesSortedAlphabeticallyAsync(_tokenAccessor.Token)
                                         .GetAwaiter()
                                         .GetResult();

        return Ok(results);
    }

    [HttpPost(Name = "Post new ingredients (potentially existing)")]
    [ActionName("add")]
    public List<IngredientDto> Post(PostIngredientsDto dto)
    {
        var results = _ingredientsManager.AddAndGetExistingAsync(dto.IngredientNames, _tokenAccessor.Token)
                                         .GetAwaiter()
                                         .GetResult();

        return results.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    [HttpDelete("{ingredientId:guid}", Name = "Remove a given ingredient")]
    public IActionResult Delete(Guid ingredientId)
    {
        try {
            _ingredientsManager.DeleteAsync(new(ingredientId), _tokenAccessor.Token)
                               .GetAwaiter()
                               .GetResult();
        } catch (Exception ex) {
            throw new BadHttpRequestException(
                $"couldn't remove the {nameof(Ingredient)} '{ingredientId}', {ex.Message}");
        }

        return Ok();
    }

    [HttpGet(Name = "Get ingredient measurement options")]
    [ActionName("measurements")]
    public ActionResult<List<MeasurementUnitDto>> GetMeasurementOptions()
    {
        var results = _ingredientsManager.GetMeasurementOptions();
        return Ok(results.Select(MeasurementMapper.ToDto).ToList());
    }
}