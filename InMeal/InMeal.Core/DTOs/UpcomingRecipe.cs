namespace InMeal.Core.DTOs;

public record UpcomingRecipe(
    Guid Id,
    RecipeDto Item,
    string Label,
    string Status,
    Image Image
);
