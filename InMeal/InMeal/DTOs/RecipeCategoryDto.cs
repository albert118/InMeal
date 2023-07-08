using InMeal.Core.Entities;
using InMeal.Core.Enumerations;

namespace InMeal.DTOs;

public sealed record RecipeCategoryDto(
    string RecipeTitle,
    Cuisine RecipeCategory,
    RecipeId RecipeId
);
