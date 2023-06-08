using InMeal.Core.Enumerations;

namespace InMeal.Core.DTOs;

public sealed record AddRecipeCategoryDto(Guid RecipeId, Cuisine RecipeCategory);
