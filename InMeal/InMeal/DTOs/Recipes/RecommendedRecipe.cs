using InMeal.Core.Entities;
using InMeal.DTOs.Upcoming;

namespace InMeal.DTOs.Recipes;

public record RecommendedRecipe(
    RecipeId Id,
    RecipeDto Item,
    string Label,
    string Status,
    Image Image
);
