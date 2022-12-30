namespace InMeal.Core.Entities;

public class RecipeIngredient
{
    public Guid Id { get; set; }

    // The parent/principal
    public Recipe Recipe { get; set; }

    public Ingredient Ingredient { get; set; }

    // A JSON encoded field (non-nullable)
    public Quantity Quantity { get; set; }
}
