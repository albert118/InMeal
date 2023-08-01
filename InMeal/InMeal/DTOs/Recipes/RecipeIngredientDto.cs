namespace InMeal.DTOs.Recipes;

public record RecipeIngredientDto(Guid? Id, string Label, Guid IngredientId, int Quantity);