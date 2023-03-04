namespace InMeal.Core.DTOs;

public sealed record RecipeDto(
    Guid? Id,
    string Title,
    string? Blurb,
    string PreparationSteps,
    int? CookTime,
    int? PrepTime,
    List<RecipeIngredientDto> RecipeIngredientDtos
);
