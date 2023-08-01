using InMeal.Core.Enumerations;

namespace InMeal.Core.Entities;

public record Quantity(int amount = 1, MeasurementUnit units = MeasurementUnit.unknown);