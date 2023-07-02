using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Core.Mappers;
using InMeal.Features;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IRecipeManager _recipeManager;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipesController(IRecipeManager recipeManager, ICancellationTokenAccessor tokenAccessor)
    {
        _recipeManager = recipeManager;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost("[action]", Name = "View all recipes with given IDs")]
    [ActionName("all")]
    public List<RecipeDto> Post(ICollection<Guid> ids)
    {
        var keys = ids.Select(id => new RecipeId(id));
        var result = _recipeManager.GetRecipesAsync(keys, _tokenAccessor.Token)
                                   .GetAwaiter()
                                   .GetResult();

        return result.Count == 0 ? new() : result.Select(RecipeMapper.ToDto).ToList();
    }

    [HttpGet("{id:guid}", Name = "View Recipe")]
    public ActionResult<RecipeDto?> Get(Guid id)
    {
        var result = _recipeManager.GetRecipesAsync(new List<RecipeId> { new(id) }, _tokenAccessor.Token)
                                   .GetAwaiter()
                                   .GetResult()
                                   .SingleOrDefault();

        return result == null ? null : RecipeMapper.ToDto(result);
    }

    [HttpPost("[action]", Name = "Add a new recipe")]
    [ActionName("add")]
    public ActionResult<Guid> Post(RecipeDto dto)
    {
        if (dto.Id != null) {
            return BadRequest("An ID is required to edit an existing recipe");
        }

        var newRecipe = RecipeMapper.FromDto(dto);
        var result = _recipeManager.AddRecipeAsync(newRecipe, _tokenAccessor.Token)
                      .GetAwaiter()
                      .GetResult();

        return result.Id.Id;
    }

    [HttpPost("[action]", Name = "Edit an existing recipe")]
    [ActionName("edit")]
    public IActionResult Patch(RecipeDto dto)
    {
        if (dto.Id != null) {
            return BadRequest("An ID is required to edit an existing recipe");
        }

        _recipeManager.EditRecipeAsync(dto, _tokenAccessor.Token)
                      .GetAwaiter()
                      .GetResult();

        return Ok();
    }

    // personally im not a fan of this endpoint, but it's a nice stop gap for smaller datasets where nothing complex is required
    [HttpPost("[action]", Name = "View all stopgap")]
    [ActionName("everything")]
    public ActionResult<List<RecipeDto>> Get()
    {
        var result = _recipeManager.GetRecipesAsync(_tokenAccessor.Token)
                      .GetAwaiter()
                      .GetResult();

        return result.Count == 0 
            ? new() 
            : result.Select(RecipeMapper.ToDto).ToList();
    }
}
