namespace InMeal.DTOs.Ingredients;

public record IngredientDetailDto(Guid Id, string Name, MeasurementUnitDto Units, int RecipeUsageCount);
