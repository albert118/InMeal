using InMeal.Core.Entities;
using InMeal.Core.Enumerations;

namespace InMeal.DTOs.Recipes;

public sealed record RecipeCategoryDto(
    string RecipeTitle,
    Cuisine RecipeCategory,
    RecipeId RecipeId
);
