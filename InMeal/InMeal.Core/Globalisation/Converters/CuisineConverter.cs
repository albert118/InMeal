using InMeal.Core.Enumerations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace InMeal.Core.Globalisation.Converters;

public class CuisineConverter : ValueConverter<Cuisine, string>
{
    public CuisineConverter() : base(
        v => v.ToString(),
        v => (Cuisine)Enum.Parse(typeof(Cuisine), v)
    ) { }
}
