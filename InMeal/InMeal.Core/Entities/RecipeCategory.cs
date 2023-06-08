using InMeal.Core.Enumerations;

namespace InMeal.Core.Entities;

public class RecipeCategory
{
    public RecipeCategory()
    {
        Category = Cuisine.Unknown;
    }

    public Guid Id { get; set; }

    public Cuisine Category { get; set; }

    public Recipe Recipe { get; set; }

    public Guid RecipeId { get; set; }
}
