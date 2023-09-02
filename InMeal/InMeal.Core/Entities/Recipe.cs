using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class Recipe : IHaveState<RecipeMemento>
{
    public Recipe(string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime)
    {
        if (string.IsNullOrEmpty(title)) throw new ArgumentException("a title is required");
        if (string.IsNullOrEmpty(preparationSteps)) throw new ArgumentException("preparation steps are required");

        Id = new RecipeId(Guid.NewGuid());

        Title = StandardiseTitle(title);
        Blurb = blurb ?? string.Empty;
        PreparationSteps = preparationSteps;

        CookTime = cookTime;
        PrepTime = prepTime;
        CourseType = MealCourse.Unknown;
        MealType = MealType.Unknown;
        Servings = 1;

        Category = new(new(Guid.NewGuid()), Id, Cuisine.Unknown);
        RecipeIngredients = new();
    }

    private Recipe(RecipeMemento memento)
    {
        Id = new(memento.Id);

        Title = memento.Title;
        Blurb = memento.Blurb;
        PreparationSteps = memento.PreparationSteps;
        
        CookTime = memento.CookTime;
        PrepTime = memento.PrepTime;
        CourseType = memento.CourseType;
        MealType = memento.MealType;
        Servings = memento.Servings;

        Category = memento.Category != null ? RecipeCategory.FromMemento(memento.Category) : null;
        RecipeIngredients = memento.RecipeIngredients.Select(RecipeIngredient.FromMemento).ToList();
    }

    public static Recipe FromMemento(RecipeMemento memento) => new(memento);

    public RecipeId Id { get; set; }

    public int? CookTime { get; set; }

    public int? PrepTime { get; set; }

    public int Servings { get; set; }

    public string Title { get; set; }

    public string? Blurb { get; set; }

    public MealCourse CourseType { get; set; }

    public MealType MealType { get; set; }

    public RecipeCategory? Category { get; set; }

    public List<RecipeIngredient> RecipeIngredients { get; set; }

    /// <summary>
    /// A JSON encoded field containing the relevant method to prepare and cook the recipe
    /// </summary>
    public string PreparationSteps { get; set; }

    public RecipeMemento State => new(this);

    public RecipeCategoryId AddCategory(Cuisine category)
    {
        if (Category != null) {
            Category.Category = category;
        } else {
            Category = new RecipeCategory(this, category);
        }

        return Category.Id;
    }

    public void RemoveCategory()
    {
        if (Category != null)
            Category.Category = Cuisine.Unknown;
    }
    
    public void EditDetails(string title, string? blurb, string preparationSteps, int? prepTime, int? cookTime)
    {
        if (string.IsNullOrEmpty(title)) throw new ArgumentException("a title is required");
        if (string.IsNullOrEmpty(preparationSteps)) throw new ArgumentException("preparation steps are required");

        Title = StandardiseTitle(title);;
        Blurb = blurb ?? string.Empty;
        PreparationSteps = preparationSteps;
        PrepTime = prepTime;
        CookTime = cookTime;
    }

    public void UpdateIngredients(IReadOnlyCollection<RecipeIngredient> recipeIngredients)
    {
        if (!recipeIngredients.Any()) {
            ClearRecipeIngredients();
            return;
        }

        RecipeIngredients = recipeIngredients.ToList();
    }

    private void ClearRecipeIngredients()
    {
        RecipeIngredients = new();
    }
    
    private static string StandardiseTitle(string title) => title.ToLowerInvariant().Trim();
}

public class RecipeId : Identity<Guid>
{
    public RecipeId(Guid id) : base(id) { }
}