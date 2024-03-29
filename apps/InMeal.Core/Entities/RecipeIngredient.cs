﻿using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class RecipeIngredient : IHaveState<RecipeIngredientMemento>
{
    public RecipeIngredient(RecipeIngredientId id, RecipeId recipeId, Ingredient ingredient, int quantity)
    {
        Id = id;
        Quantity = quantity;
        Ingredient = ingredient;
        RecipeId = recipeId;
        IngredientId = ingredient.Id;
    }

    private RecipeIngredient(RecipeIngredientMemento memento)
    {
        Id = new(memento.Id);
        RecipeId = new(memento.RecipeId);
        Quantity = memento.Quantity;
        IngredientId = new(memento.IngredientId);
        // sometimes we may not wish to load the entire relation
        Ingredient = memento.Ingredient != null ? Ingredient.FromMemento(memento.Ingredient) : null;
    }

    public static RecipeIngredient FromMemento(RecipeIngredientMemento memento) => new(memento);

    public RecipeIngredientId Id { get; set; }

    public RecipeId RecipeId { get; set; }

    public Ingredient? Ingredient { get; set; }
    
    public IngredientId IngredientId { get; set; }

    public int Quantity { get; set; }

    public RecipeIngredientMemento State => new(Id.Key, RecipeId.Key, IngredientId.Key, Quantity);
}

public class RecipeIngredientId : Identity<Guid>
{
    public RecipeIngredientId(Guid id) : base(id) { }
}