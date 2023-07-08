using InMeal.DTOs.Recipes;
using InMeal.Infrastructure.Interfaces.QueryServices;
using InMeal.Mappers;

namespace InMeal.Features.Upcoming;

public interface IRecommendedRecipesService
{
    Task< List<RecommendedRecipe>> GetRecommended(CancellationToken ct);
}

[InstanceScopedBusinessService]
public class RecommendedRecipesService : IRecommendedRecipesService
{
    private readonly IAsyncRecipeQueryService _queryService;

    public RecommendedRecipesService(IAsyncRecipeQueryService queryService)
    {
        _queryService = queryService;
    }

    public async Task<List<RecommendedRecipe>> GetRecommended(CancellationToken ct)
    {
        const int countRecommended = 12;
        var recipes = await _queryService.GetRecommendedRecipes(countRecommended, ct);
        return recipes.Select(RecipeMapper.ToRecommended).ToList();
    }
}
