using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipeMemento : EntityMemento, IArchivable
{
    private RecipeMemento() { }

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

        Category = recipe.Category?.State;
        CategoryId = recipe.Category?.Id.Key;
       
        _recipeIngredients = recipe.RecipeIngredients.Select(ri => ri.State).ToHashSet();

        IsArchived = false;
    }

    public Guid Id { get; private set; }

    public int? CookTime { get; private set; }

    public int? PrepTime { get; private set; }

    public int Servings { get; private set; }

    public string Title { get; private set; }

    public string? Blurb { get; private set; }

    public MealCourse CourseType { get; private set; }

    public MealType MealType { get; private set; }

    public RecipeCategoryMemento? Category { get; private set; }
    
    public Guid? CategoryId { get; private set; }

    public IEnumerable<RecipeIngredientMemento> RecipeIngredients => _recipeIngredients.AsEnumerable();

    private readonly HashSet<RecipeIngredientMemento> _recipeIngredients = new();

    /// <summary>
    /// A JSON encoded field containing the relevant method to prepare and cook the recipe
    /// </summary>
    public string PreparationSteps { get; private set; }

    public bool IsArchived { get; set; }
}