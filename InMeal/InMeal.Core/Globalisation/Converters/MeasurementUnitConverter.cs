using InMeal.Core.Enumerations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace InMeal.Core.Globalisation.Converters;

public class MeasurementUnitConverter : ValueConverter<MeasurementUnit, string>
{
    public MeasurementUnitConverter() : base(
        v => v.ToString(),
        v => (MeasurementUnit)Enum.Parse(typeof(MeasurementUnit), v)
    ) { }
}
