using InMeal.Core.Enumerations;
using InMeal.DTOs.Ingredients;

namespace InMeal.Mappers;

public static class MeasurementMapper
{
    public static MeasurementUnitDto ToDto(MeasurementUnit unit)
    {
        return new(Name: unit.ToString().ToLowerInvariant());
    }
}