namespace InMeal.Core.DTOs;

public record UpcomingRecipe(
    Guid Id,
    RecipeDto Recipe,
    string Label,
    PreparationStatus PreparationStatus,
    Image Image
);

public enum PreparationStatus
{
    Unknown = 0,
    MissingIngredients,
    Unprepared,
    Prepared
}
