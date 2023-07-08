using InMeal.Core.Entities;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipeIngredientMemento : EntityMemento
{
    public RecipeIngredientMemento(Guid ingredientId, Quantity quantity)
    {
        Id = Guid.NewGuid();
        IngredientId = ingredientId;
        Quantity = quantity;
    }

    public Guid Id { get; set; }

    // The parent/principal
    public RecipeMemento Recipe { get; set; }

    public Ingredient Ingredient { get; set; }

    public Guid IngredientId { get; set; }

    public Quantity Quantity { get; set; }
}