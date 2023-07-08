using InMeal.DTOs.Upcoming;

namespace InMeal.DTOs.Recipes;

public record RecommendedRecipe(Guid Id, RecipeDto Item, string Label, string Status, Image Image);