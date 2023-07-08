namespace InMeal.DTOs.Ingredients;

public record AlphabeticallyIndexedIngredientDto(Guid IngredientId, string Name, int RecipeUsageCount);