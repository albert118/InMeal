using InMeal.Core.Enumerations;

namespace InMeal.Core.Entities;

public class RecipeCategory
{
    public RecipeCategory()
    {
        Category = Cuisine.Generic;
        Recipes = new();
    }

    public Guid Id { get; set; }

    public Cuisine Category { get; set; }

    public List<Recipe> Recipes { get; set; }
}
