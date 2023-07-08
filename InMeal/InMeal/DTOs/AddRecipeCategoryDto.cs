using InMeal.Core.Enumerations;

namespace InMeal.DTOs;

public sealed record AddRecipeCategoryDto(Guid RecipeId, Cuisine RecipeCategory);
