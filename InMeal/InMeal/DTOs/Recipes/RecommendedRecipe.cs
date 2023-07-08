using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.DTOs.Recipes;

public record RecommendedRecipe(
    RecipeId Id,
    RecipeDto Item,
    string Label,
    string Status,
    Image Image
);
