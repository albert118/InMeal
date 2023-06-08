using InMeal.Core.Enumerations;

namespace InMeal.Core.DTOs;

public sealed record RecipeCategoryDto(
    string RecipeTitle,
    Cuisine RecipeCategory,
    Guid RecipeId
);
