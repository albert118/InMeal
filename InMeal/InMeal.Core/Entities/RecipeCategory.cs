using InMeal.Core.Enumerations;

namespace InMeal.Core.Entities;

public class RecipeCategory
{
    public RecipeCategory()
    {
        Category = Cuisine.Unknown;
        Recipes = new();
    }

    public Guid Id { get; set; }

    public Cuisine Category { get; set; }

    public List<Recipe> Recipes { get; set; }
}
