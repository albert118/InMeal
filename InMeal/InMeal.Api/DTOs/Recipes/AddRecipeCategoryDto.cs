using InMeal.Core.Enumerations;

namespace InMeal.Api.DTOs.Recipes;

public sealed record AddRecipeCategoryDto(Guid RecipeId, Cuisine RecipeCategory);