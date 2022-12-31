namespace InMeal.Core.DTOs;

public sealed record RecipeDto(
    Guid? Id,
    string Title,
    string? Blurb,
    string PrepSteps,
    int? CookTime,
    int? PrepTime,
    List<AddRecipeIngredientDto> RecipeIngredientDtos
);