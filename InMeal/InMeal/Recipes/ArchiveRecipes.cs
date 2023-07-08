using InMeal.Core.Entities;
using InMeal.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class ArchiveRecipesController : ControllerBase
{
    private readonly IAsyncRecipeRepository _repository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public ArchiveRecipesController(IAsyncRecipeRepository repository, ICancellationTokenAccessor tokenAccessor)
    {
        _repository = repository;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "Archive given Recipes")]
    public IActionResult Post(ICollection<Guid> ids)
    {
        var keys = ids.Select(id => new RecipeId(id));
        _repository.ArchiveRecipesAsync(keys, _tokenAccessor.Token)
                   .GetAwaiter()
                   .GetResult();

        return Ok();
    }

    [HttpGet(Name = "Get all archived recipes")]
    public List<RecipeDto> Get()
    {
        var results = _repository.GetAllArchivedRecipesAsync(_tokenAccessor.Token)
                              .GetAwaiter()
                              .GetResult();

        if (results.Count == 0)
            return new();

        return results.Select(RecipeMapper.ToDto).ToList();
    }
}
