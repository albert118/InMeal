using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class Recipe : IHaveState<RecipeMemento>
{
    public Recipe(string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime)
    {
        Id = new RecipeId(Guid.NewGuid());

        Title = title;
        Blurb = blurb;
        PreparationSteps = preparationSteps ?? string.Empty;

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

    public void AddCategory(Cuisine category)
    {
        Category.Category = category;
    }

    public void RemoveCategory()
    {
        Category.Category = Cuisine.Unknown;
    }
    
    public void EditDetails(string title, string? blurb, string preparationSteps, int? prepTime, int? cookTime)
    {
        Title = title;
        Blurb = blurb;
        PreparationSteps = preparationSteps;
        PrepTime = prepTime;
        CookTime = cookTime;
    }

    public void UpdateIngredients(IReadOnlyDictionary<RecipeIngredientId, RecipeIngredient> recipeIngredients)
    {
        if (!recipeIngredients.Keys.Any()) {
            ClearRecipeIngredients();
            return;
        }

        var existingRecipeIngredientIds = RecipeIngredients.Select(e => e.Id).ToList();

        // case #1: add all the new ingredients
        AddChildren(recipeIngredients, existingRecipeIngredientIds);

        // case #2: update all the existing ingredients with the remaining incoming
        UpdateExistingChildren(recipeIngredients, existingRecipeIngredientIds);

        // case #3: remove ingredients that were neither added or updated
        RemoveDeletedChildren(recipeIngredients, existingRecipeIngredientIds);
    }

    private void ClearRecipeIngredients()
    {
        RecipeIngredients = new();
    }

    private void AddChildren(IReadOnlyDictionary<RecipeIngredientId, RecipeIngredient> recipeIngredients, IReadOnlyCollection<RecipeIngredientId> existingRecipeIngredientIds)
    {
        var toAdd = recipeIngredients.Where(ri => !existingRecipeIngredientIds.Contains(ri.Key)).ToList();

        RecipeIngredients.AddRange(
            toAdd.Select(ri => new RecipeIngredient(
                id: ri.Key, 
                recipeId: ri.Value.RecipeId, 
                ingredient: ri.Value.Ingredient,
                quantity: ri.Value.Quantity)
            )
        );
    }

    private void UpdateExistingChildren(IReadOnlyDictionary<RecipeIngredientId, RecipeIngredient> recipeIngredients, IReadOnlyCollection<RecipeIngredientId> existingRecipeIngredientIds)
    {
        var toUpdate = recipeIngredients.Where(ri => existingRecipeIngredientIds.Contains(ri.Key)).ToList();

        foreach (var incoming in toUpdate) {
            // all the entities retrieved here must exist with the expected IDs - hence no FirstOrDefault
            // if this throws an NRE, there's a bigger issue
            var entity = RecipeIngredients.First(e => e.Id == incoming.Key);
            entity.Quantity = incoming.Value.Quantity;
        }
    }

    private void RemoveDeletedChildren(IReadOnlyDictionary<RecipeIngredientId, RecipeIngredient> recipeIngredients, IReadOnlyCollection<RecipeIngredientId> existingRecipeIngredientIds)
    {
        var toRemove = existingRecipeIngredientIds.Where(id => !recipeIngredients.Keys.Contains(id)).ToList();
        RecipeIngredients.RemoveAll(e => toRemove.Contains(e.Id));
    }
}

public class RecipeId : Identity<Guid>
{
    public RecipeId(Guid id) : base(id) { }
}