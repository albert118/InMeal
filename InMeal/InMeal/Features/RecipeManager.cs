using InMeal.Infrastructure.Interfaces.DataServices;

namespace InMeal.Features;

public interface IRecipeManager
{
    
}

[InstanceScopedBusinessService]
public class RecipeManager : IRecipeManager
{
    private readonly IAsyncRecipeRepository _recipeRepository;

    public RecipeManager(IAsyncRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }
}