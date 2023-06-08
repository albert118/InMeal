using InMeal.Core.Enumerations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace InMeal.Core.Globalisation.Converters;

public class MealTypeConverter : ValueConverter<MealType, string>
{
    public MealTypeConverter() : base(
        v => v.ToString(),
        v => (MealType)Enum.Parse(typeof(MealType), v)
    ) { }
}
