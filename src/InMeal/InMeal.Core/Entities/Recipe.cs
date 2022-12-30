namespace InMeal.Core.Entities;

public class Recipe
{
    public Guid Id { get; set; }

    public int CookTime { get; set; }

    public int PrepTime { get; set; }

    public int Servings { get; set; } = 1;

    public string Title { get; set; }

    public string Blurb { get; set; }

    public RecipePhoto? RecipePhoto { get; set; }

    /// <summary>
    /// A collection of ingredients and the quantity required
    /// </summary>
    // public Dictionary<Ingredient, Quantity>? RecipeIngredients { get; set; }

    /// <summary>
    /// A JSON encoded field containing the relevant method to prepare and cook the recipe
    /// </summary>
    public string PreparationSteps { get; set; } = string.Empty;
}
