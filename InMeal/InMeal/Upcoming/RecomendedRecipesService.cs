using InMeal.Core.DTOs;
using InMeal.Core.Mappers;
using InMeal.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;

namespace InMeal.Upcoming;

public interface IRecommendedRecipesService
{
    Task< List<RecommendedRecipe>> GetRecommendedRecipesAsync(CancellationToken ct);
}

[InstanceScopedBusinessService]
public class RecommendedRecipesService : IRecommendedRecipesService
{
    private readonly IAsyncRecipeRepository _repository;

    public RecommendedRecipesService(IAsyncRecipeRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<RecommendedRecipe>> GetRecommendedRecipesAsync(CancellationToken ct)
    {
        const int countRecommended = 12;
        var recipes = await _repository.GetRecommendedRecipes(countRecommended, ct);
        return recipes.Select(RecipeMapper.ToRecommended).ToList();
    }
}
