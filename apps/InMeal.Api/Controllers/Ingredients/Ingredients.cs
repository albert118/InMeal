using Configuration;
using InMeal.Api.DTOs.Ingredients;
using InMeal.Api.Features.Ingredients;
using InMeal.Api.Mappers;
using InMeal.Core.Entities;
using InMeal.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Api.Controllers.Ingredients;

[ApiController]
[Route("api/[controller]/[action]")]
public class IngredientsController : ControllerBase
{
    private readonly IIngredientsManager _ingredientsManager;
    private readonly ICancellationTokenAccessor _tokenAccessor;
    private readonly FakeRecipeImageMicroserviceConfig _fakeRecipeImageMicroserviceConfig;

    public IngredientsController(IIngredientsManager ingredientsManager, ICancellationTokenAccessor tokenAccessor, FakeRecipeImageMicroserviceConfig fakeRecipeImageMicroserviceConfig)
    {
        _ingredientsManager = ingredientsManager;
        _tokenAccessor = tokenAccessor;
        _fakeRecipeImageMicroserviceConfig = fakeRecipeImageMicroserviceConfig;
    }

    [HttpGet(Name = "View all ingredients (paginated)")]
    [ActionName("all")]
    public ActionResult<List<IngredientDto>> Get(int? skip, int? take)
    {
        var results = _ingredientsManager.GetIngredientsAsync(skip, take, _tokenAccessor.Token)
                                         .GetAwaiter()
                                         .GetResult();

        var fakeUrl = $"{_fakeRecipeImageMicroserviceConfig.serviceUrl}/static/stir-fry.jpg";
        return results.Count == 0 ? new() : results.Select(r => r.MapToIngredientDto(fakeUrl)).ToList();
    }
    
    [HttpGet("{ingredientId:guid}", Name = "View an ingredient")]
    public ActionResult<IngredientDetailDto> Get(Guid ingredientId)
    {
        var result = _ingredientsManager.GetIngredientDetailAsync(new() { new(ingredientId) }, _tokenAccessor.Token)
                                        .GetAwaiter()
                                        .GetResult()
                                        .SingleOrDefault();

        return result == null ? BadRequest("no ingredient found") : result;
    }

    [HttpPatch(Name = "Edit an ingredient")]
    [ActionName("update")]
    public IActionResult Get(EditIngredientDto dto)
    {
        try {
            _ingredientsManager.EditAsync(dto, _tokenAccessor.Token)
                               .GetAwaiter()
                               .GetResult();
        } catch (Exception ex) {
            return BadRequest(ex.Message);
        }

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

        // TODO: this would be where to save the image URL
        return results.Select(r => r.MapToIngredientDto("#")).ToList();
    }

    [HttpPost(Name = "Delete the given ingredients")]
    [ActionName("delete")]
    public IActionResult Delete(DeleteIngredientsRequestDto request)
    {
        try {
            EmptyGuidGuard.Apply(request.IngredientIds);
            var keys = request.IngredientIds.Select(id => new IngredientId(id)).ToList();
            _ingredientsManager.DeleteAsync(keys, _tokenAccessor.Token)
                               .GetAwaiter()
                               .GetResult();
        } catch (Exception ex) {
            return BadRequest(ex.Message);
        }

        return Ok();
    }

    [HttpGet(Name = "Get ingredient measurement options")]
    [ActionName("measurements")]
    public ActionResult<List<MeasurementUnitDto>> GetMeasurementOptions()
    {
        var results = _ingredientsManager.GetMeasurementOptions();
        return Ok(results.Select(MeasurementMapper.ToDto).OrderBy(dto => dto.Name).ToList());
    }
}