using InMeal.Api.DTOs.Recipes;
using InMeal.Api.Mappers;
using InMeal.Infrastructure.Interfaces.External.GenerativeRecipeImages;
using InMeal.Infrastructure.Interfaces.QueryServices;

namespace InMeal.Api.Features.Upcoming;

public interface IRecommendedRecipesService
{
    Task<List<RecommendedRecipe>> GetRecommended(CancellationToken ct);
}

public class RecommendedRecipesService : IRecommendedRecipesService
{
    private readonly IAsyncRecipeQueryService _queryService;
    private readonly IGenerativeRecipeImages _generativeRecipeImages;

    public RecommendedRecipesService(IAsyncRecipeQueryService queryService, IGenerativeRecipeImages generativeRecipeImages)
    {
        _queryService = queryService;
        _generativeRecipeImages = generativeRecipeImages;
    }

    public async Task<List<RecommendedRecipe>> GetRecommended(CancellationToken ct)
    {
        const int countRecommended = 12;
        var recipes = await _queryService.GetRecommendedRecipes(countRecommended, ct);
        var content = await _generativeRecipeImages.GetRandomImage();
        return recipes.Select(r => RecipeMapper.ToRecommended(r, content.Url)).ToList();
    }
}