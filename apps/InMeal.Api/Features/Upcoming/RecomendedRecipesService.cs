using Configuration;
using InMeal.Api.DTOs.Recipes;
using InMeal.Api.Mappers;
using InMeal.Infrastructure.Interfaces.QueryServices;

namespace InMeal.Api.Features.Upcoming;

public interface IRecommendedRecipesService
{
    Task<List<RecommendedRecipe>> GetRecommended(CancellationToken ct);
}

public class RecommendedRecipesService : IRecommendedRecipesService
{
    private readonly IAsyncRecipeQueryService _queryService;
    private readonly FakeRecipeImageMicroserviceConfig _fakeRecipeImageMicroserviceConfig;

    public RecommendedRecipesService(IAsyncRecipeQueryService queryService, FakeRecipeImageMicroserviceConfig fakeRecipeImageMicroserviceConfig)
    {
        _queryService = queryService;
        _fakeRecipeImageMicroserviceConfig = fakeRecipeImageMicroserviceConfig;
    }

    public async Task<List<RecommendedRecipe>> GetRecommended(CancellationToken ct)
    {
        const int countRecommended = 12;
        var recipes = await _queryService.GetRecommendedRecipes(countRecommended, ct);
        var fakeUrl = $"{_fakeRecipeImageMicroserviceConfig.serviceUrl}/static/stir-fry.jpg";        
        return recipes.Select(r => RecipeMapper.ToRecommended(r, fakeUrl)).ToList();
    }
}