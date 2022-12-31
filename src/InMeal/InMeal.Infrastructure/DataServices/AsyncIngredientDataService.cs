using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncIngredientDataService : IAsyncIngredientDataService
{
    private readonly ILogger<AsyncIngredientDataService> _logger;
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncIngredientDataService(IRecipeDbContext recipeDbContext, ILogger<AsyncIngredientDataService> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public Task<List<Ingredient>> GetIngredientsAsync(ICollection<Guid> ids, CancellationToken ct)
    {
        if (ids.Any(e => e.IsEmpty())) {
            throw new DataException(
                "Attempting to get ingredients with empty ('00000000-0000-0000-0000-000000000000') IDs is not possible");
        }

        return _recipeDbContext.Ingredients.Where(i => ids.Contains(i.Id)).ToListAsync(ct);
    }

    public Task<bool> AddIngredientsAsync(ICollection<string> names, CancellationToken ct)
    {
        throw new NotImplementedException();
    }
}
