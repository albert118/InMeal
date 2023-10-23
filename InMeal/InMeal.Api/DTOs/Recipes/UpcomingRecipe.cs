using InMeal.Api.DTOs.Upcoming;
using InMeal.Core.Entities;

namespace InMeal.Api.DTOs.Recipes;

public record UpcomingRecipe(
    RecipeId Id,
    RecipeDto Item,
    string Label,
    string Status,
    Image Image
);