using InMeal.Core.DTOs;
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
        var ct = _tokenAccessor.Token;
        var task = _repository.ArchiveRecipesAsync(ids.ToList(), ct);
        task.Wait(ct);

        return Ok();
    }

    [HttpGet(Name = "Get all archived recipes")]
    public List<RecipeDto> Get()
    {
        var ct = _tokenAccessor.Token;
        var task = _repository.GetAllArchivedRecipesAsync(ct);
        task.Wait(ct);

        if (task.Result.Count == 0)
            return new();

        return task.Result.Select(RecipeMapper.ToDto).ToList();
    }
}
