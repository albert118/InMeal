using InMeal.Core.Enumerations;

namespace InMeal.Core.Entities;

public class RecipeCategory
{
    public Guid RecipeId { get; set; }

    public Cuisine Category { get; set; } = Cuisine.Generic;
}