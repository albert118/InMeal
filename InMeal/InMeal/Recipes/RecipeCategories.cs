using InMeal.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Recipes;

[ApiController]
[Route("api/[controller]")]
public class RecipeCategories
{
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public RecipeCategories(ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _tokenAccessor = cancellationTokenAccessor;
    }

    [HttpGet("[action]", Name = "View all recipe categories")]
    [ActionName("all")]
    public List<RecipeCategoryDto> Get()
    {
        return new();
    }

    [HttpPost("[action]", Name = "Add a new recipe category for a given recipe")]
    [ActionName("add")]
    public Guid Get(AddRecipeCategoryDto dto)
    {
        return new();
    }
}
