using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class RecipeCategory : IHaveState<RecipeCategoryMemento>
{
    public RecipeCategory(RecipeCategoryId recipeCategoryId, RecipeId recipeId, Cuisine category)
    {
        Id = recipeCategoryId;
        RecipeId = recipeId;
        Category = category;
    }

    public static RecipeCategory FromMemento(RecipeCategoryMemento memento)
    {
        return new(
            new(memento.Id),
            new(memento.RecipeId),
            memento.Category
        );
    }

    public RecipeCategoryId Id { get; set; }

    public Cuisine Category { get; set; }

    public RecipeId RecipeId { get; set; }

    public RecipeCategoryMemento State => new(this);
}

public class RecipeCategoryId : Identity<Guid>
{
    public RecipeCategoryId(Guid id) : base(id) { }
}