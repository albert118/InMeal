using InMeal.Core.Entities;

namespace InMeal.Core.DTOs;

public record UpcomingRecipe(
    RecipeId Id,
    RecipeDto Item,
    string Label,
    string Status,
    Image Image
);
