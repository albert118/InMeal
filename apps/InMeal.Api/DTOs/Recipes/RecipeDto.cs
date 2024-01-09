using InMeal.Core.Enumerations;

namespace InMeal.Api.DTOs.Recipes;

public sealed record RecipeDto(
    Guid? Id,
    string Title,
    string? Blurb,
    string PreparationSteps,
    int CookTime,
    int PrepTime,
    int Servings,
    List<RecipeIngredientDto> RecipeIngredients,
    Cuisine Category,
    MealCourse Course,
    MealType Type
);
