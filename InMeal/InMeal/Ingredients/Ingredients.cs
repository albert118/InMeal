using InMeal.Core.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Ingredients;

[ApiController]
[Route("api/[controller]/[action]")]
public class IngredientsController : ControllerBase
{
    private readonly IAsyncIngredientRepository _ingredientRepository;
    private readonly IAsyncRecipeIngredientRepository _recipeIngredientRepository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public IngredientsController(IAsyncIngredientRepository ingredientRepository, IAsyncRecipeIngredientRepository recipeIngredientRepository, ICancellationTokenAccessor tokenAccessor)
    {
        _ingredientRepository = ingredientRepository;
        _recipeIngredientRepository = recipeIngredientRepository;
        _tokenAccessor = tokenAccessor;
    }

    [HttpGet(Name = "View all ingredients (paginated)")]
    [ActionName("all")]
    public List<IngredientDto> Get(int? skip, int? take)
    {
        var ct = _tokenAccessor.Token;

        var task = _ingredientRepository.GetIngredientsAsync(skip ?? 0, take ?? 25, ct);
        task.Wait(ct);

        return task.Result.Count == 0
            ? new()
            : task.Result.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    public record EditIngredientNameDto(Guid IngredientId, string NewName);
    
    [HttpPatch(Name = "Edit an ingredient name")]
    [ActionName("update")]
    public IActionResult Get(EditIngredientNameDto dto)
    {
        var ct = _tokenAccessor.Token;
    
        var task = _ingredientRepository.UpdateIngredientName(dto.IngredientId, dto.NewName, ct);
        task.Wait(ct);
    
        return Ok();
    }
    
    [HttpGet(Name = "View all alphabetically indexed ingredients")]
    [ActionName("indexed")]
    public Dictionary<string, List<AlphabeticallyIndexedIngredientDto>> Get()
    {
        var ct = _tokenAccessor.Token;
        
        // this query chaining and mapping should be in a biz service
        var indexedResults = _ingredientRepository
            .GetAlphabeticallyIndexedIngredientsAsync(ct)
            .GetAwaiter()
            .GetResult();

        var usageCountResults = _recipeIngredientRepository
            .GetIngredientUsageCount(ct)
            .GetAwaiter()
            .GetResult();

        // merge results with the mapper
        return indexedResults.Count == 0
            ? new()
            : indexedResults.MapToAlphabeticallyIndexedIngredientsDto(usageCountResults);
    }

    [HttpPost(Name = "Post new ingredients (potentially existing)")]
    public List<IngredientDto> Post(PostIngredientsDto dto)
    {
        var ct = _tokenAccessor.Token;

        // enforce lower case names for ingredients
        // this should be some biz service enforcing this
        var task = _ingredientRepository.AddOrGetExistingIngredientsAsync(dto.IngredientNames.Select(i => i.ToLowerInvariant()).ToList(), ct);
        
        task.Wait(ct);

        return task.Result.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    public record PostIngredientsDto(List<string> IngredientNames);
}
