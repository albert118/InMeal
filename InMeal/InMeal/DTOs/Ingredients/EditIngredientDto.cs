using InMeal.Core.Enumerations;

namespace InMeal.DTOs.Ingredients;

public record EditIngredientDto(Guid IngredientId, string? NewName, MeasurementUnit? NewUnit);