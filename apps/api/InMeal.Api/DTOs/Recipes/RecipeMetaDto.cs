using InMeal.Core.Enumerations;

namespace InMeal.Api.DTOs.Recipes;

public sealed record RecipeMetaDto(
    Dictionary<int, MealCourse> Courses, 
    Dictionary<int, MealType> Types,
    Dictionary<int, Cuisine> Categories
);
