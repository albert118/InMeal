namespace InMeal.Api.DTOs.Ingredients;

public record IngredientDetailDto(Guid Id, string Name, MeasurementUnitDto Units, int RecipeUsageCount);
