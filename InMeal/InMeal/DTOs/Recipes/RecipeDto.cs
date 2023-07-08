using InMeal.Core.Entities;

namespace InMeal.DTOs.Recipes;

public sealed record RecipeDto(
    RecipeId? Id,
    string Title,
    string? Blurb,
    string PreparationSteps,
    int? CookTime,
    int? PrepTime,
    Dictionary<RecipeIngredientId, RecipeIngredientDto> RecipeIngredients
);
