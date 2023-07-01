using InMeal.Core.Enumerations;
using InMeal.Core.Globalisation;
using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class Recipe : IHaveState<RecipeMemento>
{
    public RecipeId Id { get; set; }

    public int? CookTime { get; set; }

    public int? PrepTime { get; set; }

    public int Servings { get; set; } = 1;

    public string Title { get; set; }

    public string? Blurb { get; set; }

    public MealCourse CourseType { get; set; }

    public MealType MealType { get; set; }

    public RecipeCategory Category { get; set; }

    public RecipePhoto? RecipePhoto { get; set; }

    public List<RecipeIngredient> RecipeIngredients { get; set; }

    /// <summary>
    /// A JSON encoded field containing the relevant method to prepare and cook the recipe
    /// </summary>
    public string PreparationSteps { get; set; }

    public RecipeMemento State => new(Title, Blurb, PreparationSteps, CookTime, PrepTime);

    public static Recipe FromMemento(RecipeMemento memento)
    {
        return new(
            new RecipeId(memento.Id),
            memento.Title,
            memento.Blurb,
            memento.PreparationSteps,
            memento.CookTime,
            memento.PrepTime
        );
    }
    
    public Recipe(RecipeId recipeId, string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime)
    {
        Id = recipeId;

        Title = title;
        Blurb = blurb;

        CookTime = cookTime;
        PrepTime = prepTime;

        PreparationSteps = preparationSteps ?? string.Empty;

        RecipeIngredients = new();

        CourseType = MealCourse.Unknown;
        MealType = MealType.Unknown;
    }
}

public class RecipeId : Identity<Guid>
{
    public RecipeId(Guid id) : base(id) { }
}