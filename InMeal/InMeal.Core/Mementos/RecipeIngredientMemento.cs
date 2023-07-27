using InMeal.Core.Entities;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipeIngredientMemento : EntityMemento
{
    private RecipeIngredientMemento() { }

    internal RecipeIngredientMemento(Guid id, Guid recipeId, Guid ingredientId, Quantity quantity)
    {
        Id = id;
        RecipeId = recipeId;
        IngredientId = ingredientId;
        Quantity = quantity;
        // avoid loading the relations by default
        Ingredient = null;
        Recipe = null;
    }

    public Guid Id { get; private set; }

    public RecipeMemento? Recipe { get; private set; }

    public Guid RecipeId { get; private set; }

    public IngredientMemento? Ingredient { get; private set; }

    public Guid IngredientId { get; private set; }

    public Quantity Quantity { get; private set; }

    public void UpdateFrom(RecipeIngredientMemento memento)
    {
        Quantity = memento.Quantity;
    }
}