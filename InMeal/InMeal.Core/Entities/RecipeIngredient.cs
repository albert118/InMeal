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
    }

    public RecipeIngredientId Id { get; set; }

    public RecipeMemento Recipe { get; set; }

    public Ingredient Ingredient { get; set; }

    public Guid IngredientId { get; set; }

    public Quantity Quantity { get; set; }

    public RecipeIngredientMemento State => new(Id.Id, Quantity);
}

public class RecipeIngredientId : Identity<Guid>
{
    public RecipeIngredientId(Guid id) : base(id) { }
}