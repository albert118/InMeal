namespace InMeal.Api.DTOs.Ingredients;

public record AlphabeticallyIndexedIngredientDto(Guid IngredientId, string Name, int RecipeUsageCount, MeasurementUnitDto Units);