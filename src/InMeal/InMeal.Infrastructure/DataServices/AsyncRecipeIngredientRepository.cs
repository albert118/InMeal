using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncRecipeIngredientRepository : IAsyncRecipeIngredientRepository
{
    private readonly ILogger<AsyncRecipeIngredientRepository> _logger;
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeIngredientRepository(IRecipeDbContext recipeDbContext,
        ILogger<AsyncRecipeIngredientRepository> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public Task<List<RecipeIngredient>> GetRecipeIngredientsAsync(Guid recipeId, CancellationToken ct)
    {
        if (recipeId.IsEmpty()) {
            throw new DataException(
                "Attempting to get ingredients for recipe with an empty ID ('00000000-0000-0000-0000-000000000000') is not possible");
        }

        return _recipeDbContext.RecipeIngredients.Where(ri => ri.Recipe.Id == recipeId).ToListAsync(ct);
    }
}
