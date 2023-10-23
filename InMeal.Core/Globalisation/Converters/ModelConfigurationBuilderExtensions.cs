using InMeal.Core.Enumerations;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Core.Globalisation.Converters;

public static class ModelConfigurationBuilderExtensions
{
    public static ModelConfigurationBuilder AddEnumConversions(this ModelConfigurationBuilder builder)
    {
        builder.Properties<MealCourse>().HaveConversion<MealCourseConverter>();
        builder.Properties<MealType>().HaveConversion<MealTypeConverter>();
        builder.Properties<Cuisine>().HaveConversion<CuisineConverter>();
        builder.Properties<MeasurementUnit>().HaveConversion<MeasurementUnitConverter>();

        return builder;
    }
}
