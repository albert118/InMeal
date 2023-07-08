using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class RecipeIngredient : IHaveState<RecipeIngredientMemento>
{
    public RecipeIngredient(RecipeIngredientId id, Guid ingredientId, Quantity quantity)
    {
        Id = id;
        IngredientId = ingredientId;
        Quantity = quantity;

        Recipe = null;
    }

    private RecipeIngredient(RecipeIngredientMemento memento)
    {
        Id = new(memento.Id);
        IngredientId = memento.IngredientId;
        Quantity = memento.Quantity;

        // TODO;
        Ingredient = memento.Ingredient;
    }

    public static RecipeIngredient FromMemento(RecipeIngredientMemento memento) => new(memento);

    public RecipeIngredientId Id { get; set; }

    // TODO: shouldn't need the navigation property here. Nullable for the moment while editing
    public RecipeMemento? Recipe { get; set; }

    // TODO: likewise once ingredient shifts to a memento
    public Ingredient Ingredient { get; set; }

    public Guid IngredientId { get; set; }

    public Quantity Quantity { get; set; }

    public RecipeIngredientMemento State => new(Id.Id, Quantity);
}

public class RecipeIngredientId : Identity<Guid>
{
    public RecipeIngredientId(Guid id) : base(id) { }
}