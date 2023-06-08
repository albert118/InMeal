using InMeal.Core.DTOs;
using InMeal.Core.Globalisation;
using InMeal.Core.Mappers;
using InMeal.Infrastructure.Interfaces.DataServices;
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

    [HttpPost("[action]", Name = "View all recipes with given IDs")]
    [ActionName("all")]
    public List<RecipeDto> Post(ICollection<Guid> ids)
    {
        var ct = _tokenAccessor.Token;
        var task = _repository.GetRecipesAsync(ids, ct);
        task.Wait(ct);

        return task.Result.Count == 0 ? new() : task.Result.Select(RecipeMapper.ToDto).ToList();
    }

    [HttpGet("{id:guid}", Name = "View Recipe")]
    public RecipeDto? Get(Guid id)
    {
        var ct = _tokenAccessor.Token;
        var task = _repository.GetRecipeAsync(id, ct);
        task.Wait(ct);

        return task.Result == null ? null : RecipeMapper.ToDto(task.Result);
    }

    [HttpPost("[action]", Name = "Add a new recipe")]
    [ActionName("add")]
    public Guid Post(RecipeDto dto)
    {
        var ct = _tokenAccessor.Token;

        var task = _repository.AddRecipeAsync(
            dto.Title,
            dto.Blurb,
            dto.PreparationSteps,
            dto.CookTime,
            dto.PrepTime,
            dto.RecipeIngredients,
            ct
        );

        task.Wait(ct);

        if (!task.Result.HasValue) {
            throw new BadHttpRequestException("Couldn't add the recipe");
        }

        return task.Result.Value;
    }

    [HttpPost("[action]", Name = "Edit an existing recipe")]
    [ActionName("edit")]
    public async Task<IActionResult> Patch(RecipeDto dto)
    {
        if (dto.Id.IsNullOrEmpty()) {
            return BadRequest("An ID is required to edit an existing recipe");
        }

        var ct = _tokenAccessor.Token;

        var wasSuccessful = await _repository.EditRecipeAsync(dto, ct);

        return !wasSuccessful ?  BadRequest() : Ok();
    }

    // personally im not a fan of this endpoint, but it's a nice stop gap for smaller datasets where nothing complex is required
    [HttpPost("[action]", Name = "View all stopgap")]
    [ActionName("everything")]
    public List<RecipeDto> Get()
    {
        var ct = _tokenAccessor.Token;
        var task = _repository.GetRecipesAsync(ct);
        task.Wait(ct);

        return task.Result.Count == 0 ? new() : task.Result.Select(RecipeMapper.ToDto).ToList();
    }
}
