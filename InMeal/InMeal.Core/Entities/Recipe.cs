using InMeal.Core.Enumerations;

namespace InMeal.Core.Entities;

public class Recipe : IArchivable
{
    public Recipe(string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime)
    {
        Id = Guid.NewGuid();

        Title = title;
        Blurb = blurb;

        CookTime = cookTime;
        PrepTime = prepTime;

        PreparationSteps = preparationSteps ?? string.Empty;

        RecipeIngredients = new();

        CourseType = MealCourse.Unknown;
        MealType = MealType.Unknown;
    }

    public Guid Id { get; set; }

    public int? CookTime { get; set; }

    public int? PrepTime { get; set; }

    public int Servings { get; set; } = 1;

    public string Title { get; set; }

    public string? Blurb { get; set; }

    public MealCourse CourseType { get; set; }

    public MealType MealType { get; set; }

    // public RecipeCategory Category { get; set; }

    public RecipePhoto? RecipePhoto { get; set; }

    public List<RecipeIngredient> RecipeIngredients { get; set; }

    /// <summary>
    /// A JSON encoded field containing the relevant method to prepare and cook the recipe
    /// </summary>
    public string PreparationSteps { get; set; }

    #region IArchivable

    public bool isArchived { get; set; }

    #endregion
}
