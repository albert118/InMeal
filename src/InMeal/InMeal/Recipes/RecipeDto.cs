namespace InMeal.Recipes;

public sealed record RecipeDto(
    Guid? Id,
    string Title,
    string? Blurb,
    string PrepSteps,
    int? CookTime,
    int? PrepTime
);