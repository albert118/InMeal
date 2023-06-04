using InMeal.Core.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Ingredients;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController : ControllerBase
{
    private readonly IAsyncIngredientRepository _ingredientRepository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public IngredientsController(IAsyncIngredientRepository ingredientRepository, ICancellationTokenAccessor tokenAccessor)
    {
        _ingredientRepository = ingredientRepository;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "View all ingredients")]
    public List<IngredientDto> Post(ICollection<Guid> ids)
    {
        var ct = _tokenAccessor.Token;

        var task = _ingredientRepository.GetIngredientsAsync(ids, ct);
        task.Wait(ct);

        if (task.Result.Count == 0) {
            return new();
        }

        return task.Result.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    [HttpPost(Name = "Post new ingredients (potentially existing)")]
    public List<IngredientDto> Post(PostIngredientsDto dto)
    {
        var ct = _tokenAccessor.Token;

        var task = _ingredientRepository.AddOrGetExistingIngredientsAsync(dto.IngredientNames, ct);
        task.Wait(ct);

        return task.Result.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    [HttpGet(Name = "Get ingredient options")]
    public List<IngredientDto> Get()
    {
        var ct = _tokenAccessor.Token;

        var task = _ingredientRepository.GetIngredientOptionsAsync(ct);
        task.Wait(ct);

        return task.Result.Select(IngredientMapper.MapToIngredientDto).ToList();
    }

    public record PostIngredientsDto(List<string> IngredientNames);
}
