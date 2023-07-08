using InMeal.Core.Entities;
using InMeal.DTOs;
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

    [HttpPatch(Name = "Edit an ingredient name")]
    [ActionName("update")]
    public IActionResult Get(EditIngredientNameDto dto)
    {
        var key = new IngredientId(dto.IngredientId);
        _ingredientsManager.UpdateNameAsync(key, dto.NewName, _tokenAccessor.Token)
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
    public List<IngredientDto> Post(PostIngredientsDto dto)
    {
        var results = _ingredientsManager.AddAndGetExistingAsync(dto.IngredientNames, _tokenAccessor.Token)
                                         .GetAwaiter()
                                         .GetResult();

        return results.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    public record PostIngredientsDto(List<string> IngredientNames);
    
    [HttpDelete("{ingredientId:guid}", Name = "Remove a given ingredient")]
    public IActionResult Delete(Guid ingredientId)
    {
        try {
            _ingredientsManager.DeleteManyAsync(new List<IngredientId> { new(ingredientId) }, _tokenAccessor.Token)
                               .GetAwaiter()
                               .GetResult();
        } catch (Exception ex) {
            throw new BadHttpRequestException($"couldn't remove the {nameof(Ingredient)} '{ingredientId}', {ex.Message}");
        }

        return Ok();
    }
}
