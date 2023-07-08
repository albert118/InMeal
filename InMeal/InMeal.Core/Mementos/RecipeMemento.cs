using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipeMemento : EntityMemento
{
    public RecipeMemento(Recipe recipe)
    {
        Id = recipe.Id.Key;

        Title = recipe.Title;
        Blurb = recipe.Blurb;
        PreparationSteps = recipe.PreparationSteps;

        CookTime = recipe.CookTime;
        PrepTime = recipe.PrepTime;
        CourseType = MealCourse.Unknown;
        MealType = MealType.Unknown;
        Servings = 1;

        Category = recipe.Category.State;
        RecipePhoto = null;
        RecipeIngredients = recipe.RecipeIngredients.Select(ri => ri.State).ToList();
        
    }

    public Guid Id { get; private set; }

    public int? CookTime { get; private set; }

    public int? PrepTime { get; private set; }

    public int Servings { get; private set; }

    public string Title { get; private set; }

    public string? Blurb { get; private set; }

    public MealCourse CourseType { get; private set; }

    public MealType MealType { get; private set; }

    public RecipeCategoryMemento Category { get; private set; }

    public RecipePhotoMemento? RecipePhoto { get; private set; }

    public List<RecipeIngredientMemento> RecipeIngredients { get; private set; }

    /// <summary>
    /// A JSON encoded field containing the relevant method to prepare and cook the recipe
    /// </summary>
    public string PreparationSteps { get; private set; }
}