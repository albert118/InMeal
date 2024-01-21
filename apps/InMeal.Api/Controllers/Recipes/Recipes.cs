using Configuration;
using InMeal.Api.DTOs.Recipes;
using InMeal.Api.Features.Recipes;
using InMeal.Api.Mappers;
using InMeal.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Api.Controllers.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IRecipeManager _recipeManager;
    private readonly ICancellationTokenAccessor _tokenAccessor;
    private readonly FakeRecipeImageMicroserviceConfig _fakeRecipeImageMicroserviceConfig;

    public RecipesController(IRecipeManager recipeManager, ICancellationTokenAccessor tokenAccessor,FakeRecipeImageMicroserviceConfig fakeRecipeImageMicroserviceConfig)
    {
        _recipeManager = recipeManager;
        _tokenAccessor = tokenAccessor;
        _fakeRecipeImageMicroserviceConfig = fakeRecipeImageMicroserviceConfig;
    }

    [HttpPost("[action]", Name = "View all recipes with given IDs")]
    [ActionName("all")]
    public ActionResult<List<RecipeDto>> Post(ICollection<Guid> ids)
    {
        var keys = ids.Select(id => new RecipeId(id));
        var result = _recipeManager.GetManyAsync(keys, _tokenAccessor.Token)
                                   .GetAwaiter()
                                   .GetResult();
        
        var fakeUrl = $"{_fakeRecipeImageMicroserviceConfig.serviceUrl}/static/stir-fry.jpg";
        return !result.Any() ? NoContent() : Ok(result.Select(r => RecipeMapper.ToDto(r, fakeUrl)).ToList());
    }

    [HttpGet("{id:guid}", Name = "View Recipe")]
    public ActionResult<RecipeDto?> Get(Guid id)
    {
        var result = _recipeManager.GetAsync(new(id), _tokenAccessor.Token)
                                   .GetAwaiter()
                                   .GetResult();
        var fakeUrl = $"{_fakeRecipeImageMicroserviceConfig.serviceUrl}/static/stir-fry.jpg";
        return result == null ? NotFound() : Ok(RecipeMapper.ToDto(result, fakeUrl));
    }

    [HttpPost("[action]", Name = "Add a new recipe")]
    [ActionName("add")]
    public ActionResult<Guid> Post(RecipeDto dto)
    {
        try {
            var result = _recipeManager.AddAsync(dto, _tokenAccessor.Token)
                                       .GetAwaiter()
                                       .GetResult();
            return Ok(result.Id.Key);
        } catch (Exception ex) {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("[action]", Name = "Edit an existing recipe")]
    [ActionName("edit")]
    public IActionResult Patch(EditRecipeDto dto)
    {
        try {
            _recipeManager.EditAsync(dto, _tokenAccessor.Token)
                          .GetAwaiter()
                          .GetResult();
        } catch (Exception ex) {
            return BadRequest(ex.Message);
        }
        return Ok();
    }

    [HttpPost("[action]", Name = "View all recipes grouped by course")]
    [ActionName("all/bycourse")]
    public ActionResult<RecipesByCourseDto> GroupedByCourse(GroupedByCourse request)
    {
        var result = _recipeManager.GetGroupedByMealCourseAsync(includeArchived: request.IncludeArchived, _tokenAccessor.Token)
                                   .GetAwaiter()
                                   .GetResult();

        var fakeUrl = $"{_fakeRecipeImageMicroserviceConfig.serviceUrl}/static/stir-fry.jpg";
        return !result.Any() ? NoContent() : Ok(RecipeMapper.ToDto(result, fakeUrl));
    }

    [HttpPost("[action]", Name = "Archive the given Recipes")]
    [ActionName("archive")]
    public IActionResult ArchiveRecipes(ICollection<Guid> ids)
    {
        var keys = ids.Select(id => new RecipeId(id));

        try {
            _recipeManager.ArchiveAsync(keys, _tokenAccessor.Token)
                          .GetAwaiter()
                          .GetResult();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("[action]", Name = "Restore (unarchive) the given Recipes")]
    [ActionName("restore")]
    public IActionResult RestoreRecipes(ICollection<Guid> ids)
    {
        var keys = ids.Select(id => new RecipeId(id));

        try {
            _recipeManager.RestoreAsync(keys, _tokenAccessor.Token)
                          .GetAwaiter()
                          .GetResult();
            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("[action]", Name = "Add a new recipe category for a given recipe")]
    [ActionName("category")]
    public ActionResult<Guid> AddCategory(AddRecipeCategoryDto dto)
    {
        var key = new RecipeId(dto.RecipeId);
        var result = _recipeManager.AddCategoryAsync(key, dto.RecipeCategory, _tokenAccessor.Token)
                                   .GetAwaiter()
                                   .GetResult();

        return Ok(result.Key);
    }

    [HttpDelete("[action]", Name = "Remove recipe categories for the given recipes")]
    [ActionName("category")]
    public IActionResult RemoveCategories(List<Guid> recipeIds)
    {
        var keys = recipeIds.Select(id => new RecipeId(id));

        try {
            _recipeManager.RemoveCategoriesAsync(keys, _tokenAccessor.Token)
                          .GetAwaiter()
                          .GetResult();

            return Ok();
        } catch (Exception ex) {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("[action]", Name = "Get available meal types")]
    [ActionName("meta")]
    public ActionResult<RecipeMetaDto> GetMealTypes()
    {
        return Ok(_recipeManager.GetMeta());
    }
}