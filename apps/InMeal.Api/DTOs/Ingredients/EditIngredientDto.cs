using InMeal.Core.Enumerations;

namespace InMeal.Api.DTOs.Ingredients;

public record EditIngredientDto(Guid IngredientId, string? NewName, MeasurementUnit? NewUnit);
