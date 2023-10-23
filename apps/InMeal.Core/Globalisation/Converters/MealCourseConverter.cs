using InMeal.Core.Enumerations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace InMeal.Core.Globalisation.Converters;

public class MealCourseConverter : ValueConverter<MealCourse, string>
{
    public MealCourseConverter() : base(
        v => v.ToString(),
        v => (MealCourse)Enum.Parse(typeof(MealCourse), v)
    ) { }
}
