using InMeal.Core.Enumerations;

namespace InMeal.DTOs.Recipes;

public record RecipesByCourseDto(Dictionary<MealCourse, List<RecipeDto>> Recipes);