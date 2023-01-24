using InMeal.Core.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Ingredients;

[ApiController]
[Route("api/[controller]")]
public class IngredientController : ControllerBase
{
    private readonly IAsyncIngredientRepository _ingredientRepository;
    private readonly ILogger<IngredientController> _logger;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public IngredientController(IAsyncIngredientRepository ingredientRepository, ILogger<IngredientController> logger,
        ICancellationTokenAccessor tokenAccessor)
    {
        _ingredientRepository = ingredientRepository;
        _logger = logger;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "View All Ingredients")]
    public List<IngredientDto> Post(ICollection<Guid> ids)
    {
        var ct = _tokenAccessor.Token;

        var task = _ingredientRepository.GetIngredientsAsync(ids, ct);
        task.Wait(ct);

        if (task.Result.Count == 0) {
            return new();
        }

        return task.Result.Select(i => new IngredientDto(
            i.Id,
            i.Name
        )).ToList();
    }

    [HttpPut(Name = "Put new Ingredient (potentially existing)")]
    public IngredientDto Put(string newIngredientName)
    {
        var ct = _tokenAccessor.Token;

        var task = _ingredientRepository.AddOrGetExistingIngredientAsync(newIngredientName, ct);
        task.Wait(ct);

        return new(
            task.Result,
            newIngredientName.ToLowerInvariant()
        );
    }
}
