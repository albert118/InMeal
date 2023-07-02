using InMeal.Core.DTOs;
using InMeal.Core.Enumerations;
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

// https://github.com/rbanks54/ef-and-memento/blob/master/Domain/Bus.cs
// https://github.com/rbanks54/ef-and-memento/blob/master/Application/Program.cs
// https://refactoring.guru/design-patterns/memento
// https://matthiasnoback.nl/2018/03/ormless-a-memento-like-pattern-for-object-persistence/
// https://www.richard-banks.org/2018/08/ddd-entity-framework-and-memento-pattern.html
// https://kalele.io/modeling-aggregates-with-ddd-and-entity-framework/
// https://enlabsoftware.com/development/domain-driven-design-in-asp-net-core-applications.html
    public static Recipe FromMemento(RecipeMemento memento)
    {
        return new(
            memento.Title,
            memento.Blurb,
            memento.PreparationSteps,
            memento.CookTime,
            memento.PrepTime
        );
    }
    
    public Recipe(string title, string? blurb, string? preparationSteps, int? cookTime, int? prepTime)
    {
        Title = title;
        Blurb = blurb;

        CookTime = cookTime;
        PrepTime = prepTime;

        PreparationSteps = preparationSteps ?? string.Empty;

        RecipeIngredients = new();

        CourseType = MealCourse.Unknown;
        MealType = MealType.Unknown;
    }

    public void EditDetails(string title, string? blurb, string preparationSteps, int? prepTime, int? cookTime)
    {
        Title = title;
        Blurb = blurb;
        PreparationSteps = preparationSteps;
        PrepTime = prepTime;
        CookTime = cookTime;
    }

    public void UpdateIngredients(IReadOnlyDictionary<RecipeIngredientId, RecipeIngredientDto> recipeIngredients)
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

    private void AddChildren(IReadOnlyDictionary<Guid, RecipeIngredientDto> recipeIngredients, List<RecipeIngredientId> existingRecipeIngredientIds)
    {
        var toAdd = recipeIngredients.Where(ri => !existingRecipeIngredientIds.Select(identity => identity.Id).Contains(ri.Key)).ToList();

        RecipeIngredients.AddRange(
            toAdd.Select(ri => new RecipeIngredient(new(Guid.NewGuid()), ri.Key, ri.Value.Quantity))
        );
    }

    private void UpdateExistingChildren(IReadOnlyDictionary<Guid, RecipeIngredientDto> recipeIngredients, List<RecipeIngredientId> existingRecipeIngredientIds)
    {
        var toUpdate = recipeIngredients.Where(ri => existingRecipeIngredientIds.Select(identity => identity.Id).Contains(ri.Key)).ToList();

        foreach (var incoming in toUpdate) {
            // all the entities retrieved here must exist with the expected IDs - hence no FirstOrDefault
            // if this throws an NRE, there's a bigger issue
            var entity = RecipeIngredients.First(e => e.Id.Id == incoming.Key);
            entity.Quantity = incoming.Value.Quantity;
        }
    }

    private void RemoveDeletedChildren(IReadOnlyDictionary<Guid, RecipeIngredientDto> recipeIngredients, List<RecipeIngredientId> existingRecipeIngredientIds)
    {
        var incomingRecipeIngredientIds = recipeIngredients.Select(ri => ri.Key).ToList();
        var toRemove = existingRecipeIngredientIds.Where(id => !incomingRecipeIngredientIds.Contains(id.Id)).ToList();
        RecipeIngredients.RemoveAll(e => toRemove.Contains(e.Id));
    }
}

public class RecipeId : Identity<Guid>
{
    public RecipeId(Guid id) : base(id) { }
}