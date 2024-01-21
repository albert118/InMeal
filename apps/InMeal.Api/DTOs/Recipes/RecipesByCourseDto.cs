using InMeal.Api.DTOs.Upcoming;
using InMeal.Core.Enumerations;

namespace InMeal.Api.DTOs.Recipes;

public sealed record RecipesByCourseDto(Dictionary<MealCourse, List<RecipeDetailDto>> Recipes);

public sealed record RecipeDetailDto(
    Guid Id,
    string Title,
    int CookTime,
    int PrepTime,
    int IngredientsCount,
    int Servings,
    string Category,
    string Course,
    string Type,
    Image Image
);