
namespace InMeal.DTOs.Recipes;

public sealed record RecipeDto(
    Guid? Id,
    string Title,
    string? Blurb,
    string PreparationSteps,
    int CookTime,
    int PrepTime,
    int Servings,
    List<RecipeIngredientDto> RecipeIngredients,
    string Category,
    string Course,
    string Type
);
