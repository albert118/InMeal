using InMeal.Core.Enumerations;

namespace InMeal.DTOs.Recipes;

public sealed record RecipeCategoryDto(
    string RecipeTitle,
    Cuisine RecipeCategory,
    Guid RecipeId
);