using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipeMemento : EntityMemento
{
    public RecipeMemento(string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime)
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

        Servings = 1;
    }

    public Guid Id { get; private set; }

    public int? CookTime { get; private set; }

    public int? PrepTime { get; private set; }

    public int Servings { get; private set; }

    public string Title { get; private set; }

    public string? Blurb { get; private set; }

    public MealCourse CourseType { get; private set; }

    public MealType MealType { get; private set; }

    public RecipeCategory Category { get; private set; }

    public RecipePhotoMemento? RecipePhoto { get; private set; }

    public List<RecipeIngredientMemento> RecipeIngredients { get; private set; }

    /// <summary>
    /// A JSON encoded field containing the relevant method to prepare and cook the recipe
    /// </summary>
    public string PreparationSteps { get; private set; }
}