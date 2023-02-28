namespace InMeal.Core.DTOs;

public record RecommendedRecipe(
    Guid Id,
    RecipeDto Item,
    string Label,
    string Status,
    Image Image
);
