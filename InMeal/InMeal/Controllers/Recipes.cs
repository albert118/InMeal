using InMeal.Core.Entities;
using InMeal.DTOs;
using InMeal.Features;
using InMeal.Mappers;
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
        var result = _recipeManager.GetManyAsync(keys, _tokenAccessor.Token)
                                   .GetAwaiter()
                                   .GetResult();

        return result.Count == 0 ? new() : result.Select(RecipeMapper.ToDto).ToList();
    }

    [HttpGet("{id:guid}", Name = "View Recipe")]
    public ActionResult<RecipeDto?> Get(Guid id)
    {
        var result = _recipeManager.GetManyAsync(new List<RecipeId> { new(id) }, _tokenAccessor.Token)
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

        var result = _recipeManager.AddAsync(dto, _tokenAccessor.Token)
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

        _recipeManager.EditAsync(dto, _tokenAccessor.Token)
                      .GetAwaiter()
                      .GetResult();

        return Ok();
    }

    // personally im not a fan of this endpoint, but it's a nice stop gap for smaller datasets where nothing complex is required
    [HttpPost("[action]", Name = "View all stopgap")]
    [ActionName("everything")]
    public ActionResult<List<RecipeDto>> GetAll()
    {
        var result = _recipeManager.GetManyAsync(_tokenAccessor.Token)
                      .GetAwaiter()
                      .GetResult();

        return result.Count == 0 
            ? new() 
            : result.Select(RecipeMapper.ToDto).ToList();
    }
    
    [HttpGet("[action]", Name = "Get all archived recipes")]
    [ActionName("archived")]
    public List<RecipeDto> GetArchived()
    {
        // use the default for now, as pagination isn't a thing on this API yet
        var results = _recipeManager.GetAllArchivedRecipesAsync(take: null, skip: null, _tokenAccessor.Token)
                                    .GetAwaiter()
                                    .GetResult();

        return results.Count == 0 ? new() : results.Select(RecipeMapper.ToDto).ToList();
    }
    
    [HttpPost("[action]", Name = "Archive given Recipes")]
    [ActionName("archive")]
    public IActionResult ArchiveRecipes(ICollection<Guid> ids)
    {
        var keys = ids.Select(id => new RecipeId(id));
        _recipeManager.ArchiveRecipesAsync(keys, _tokenAccessor.Token)
                      .GetAwaiter()
                      .GetResult();

        return Ok();
    }
}
