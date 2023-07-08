using InMeal.Core.Enumerations;

namespace InMeal.DTOs.Recipes;

public sealed record AddRecipeCategoryDto(Guid RecipeId, Cuisine RecipeCategory);
