using InMeal.Api.DTOs.Ingredients;
using InMeal.Core.Enumerations;

namespace InMeal.Api.Mappers;

public static class MeasurementMapper
{
    public static MeasurementUnitDto ToDto(MeasurementUnit unit)
    {
        return new(Name: unit.ToString().ToLowerInvariant());
    }
}