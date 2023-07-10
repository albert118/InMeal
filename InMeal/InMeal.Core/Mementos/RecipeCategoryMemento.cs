using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipeCategoryMemento : EntityMemento
{
    private RecipeCategoryMemento() { }

    public RecipeCategoryMemento(RecipeCategory recipeCategory)
    {
        Id = recipeCategory.Id.Key;
        RecipeId = recipeCategory.Id.Key;
        Category = recipeCategory.Category;
    }

    public Guid Id { get; private set; }

    public Cuisine Category { get; private set; }

    public Guid RecipeId { get; private set; }
}