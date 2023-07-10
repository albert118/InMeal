namespace InMeal.DTOs.Recipes;

public sealed record RecipeDto(
    Guid? Id,
    string Title,
    string? Blurb,
    string PreparationSteps,
    int? CookTime,
    int? PrepTime,
    Dictionary<Guid, RecipeIngredientDto> RecipeIngredients
);