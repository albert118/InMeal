using InMeal.Api.DTOs.Upcoming;

namespace InMeal.Api.DTOs.Recipes;

public record RecommendedRecipe(Guid Id, RecipeDto Item, string Label, string Status, Image Image);