using InMeal.Core.Entities;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipeIngredientMemento : EntityMemento
{
    public RecipeIngredientMemento(RecipeIngredient recipeIngredient)
    {
        Id = Guid.NewGuid();
        
        Quantity = recipeIngredient.Quantity;

        Recipe = null;
        RecipeId = recipeIngredient.RecipeId.Id;
        
        IngredientId = recipeIngredient.Ingredient.Id.Id;
        Ingredient = recipeIngredient.Ingredient;
        
    }

    public Guid Id { get; private set; }

    public RecipeMemento? Recipe { get; private set; }

    public Guid RecipeId { get; private set; }

    public Ingredient Ingredient { get; private set; }

    public Guid IngredientId { get; private set; }

    public Quantity Quantity { get; private set; }
}