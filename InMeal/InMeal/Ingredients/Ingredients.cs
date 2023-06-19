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
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public IngredientsController(IAsyncIngredientRepository ingredientRepository, ICancellationTokenAccessor tokenAccessor)
    {
        _ingredientRepository = ingredientRepository;
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
    
    [HttpGet(Name = "View all alphabetically indexed ingredients")]
    [ActionName("indexed")]
    public Dictionary<string, List<AlphabeticallyIndexedIngredientDto>> Get()
    {
        var ct = _tokenAccessor.Token;

        var task = _ingredientRepository.GetAlphabeticallyIndexedIngredientsAsync(ct);
        task.Wait(ct);

        return task.Result.Count == 0
            ? new()
            : task.Result.MapToAlphabeticallyIndexedIngredientsDto();
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
