using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.DTOs;

public record UpcomingRecipe(
    RecipeId Id,
    RecipeDto Item,
    string Label,
    string Status,
    Image Image
);
