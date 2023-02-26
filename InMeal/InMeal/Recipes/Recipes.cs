using InMeal.Core.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IAsyncRecipeRepository _repository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipesController(IAsyncRecipeRepository repository, ICancellationTokenAccessor tokenAccessor)
    {
        _repository = repository;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "View Selected Recipes")]
    public List<RecipeDto> Post(ICollection<Guid> ids)
    {
        var ct = _tokenAccessor.Token;
        var task = _repository.GetRecipesAsync(ids, ct);
        task.Wait(ct);

        if (task.Result.Count == 0)
            return new();

        return task.Result.Select(RecipeMapper.ToDto).ToList();
    }

    // personally im not a fan of this endpoint, but it's a nice stop gap for smaller datasets where nothing complex is required
    [HttpGet(Name = "View All Recipes")]
    public List<RecipeDto> Get()
    {
        var ct = _tokenAccessor.Token;
        var task = _repository.GetRecipesAsync(ct);
        task.Wait(ct);

        if (task.Result.Count == 0)
            return new();

        return task.Result.Select(RecipeMapper.ToDto).ToList();
    }
}
