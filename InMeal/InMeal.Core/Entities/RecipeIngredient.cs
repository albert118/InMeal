using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class RecipeIngredient : IHaveState<RecipeIngredientMemento>
{
    public RecipeIngredient(RecipeIngredientId id, RecipeId recipeId, Ingredient ingredient, Quantity quantity)
    {
        Id = id;
        Quantity = quantity;
        Ingredient = ingredient;
        RecipeId = recipeId;
    }

    private RecipeIngredient(RecipeIngredientMemento memento)
    {
        Id = new(memento.Id);
        Quantity = memento.Quantity;
        Ingredient = memento.Ingredient;
    }

    public static RecipeIngredient FromMemento(RecipeIngredientMemento memento) => new(memento);

    public RecipeIngredientId Id { get; set; }

    public RecipeId RecipeId { get; set; }

    public Ingredient Ingredient { get; set; }

    public Quantity Quantity { get; set; }

    public RecipeIngredientMemento State => new(this);
}

public class RecipeIngredientId : Identity<Guid>
{
    public RecipeIngredientId(Guid id) : base(id) { }
}