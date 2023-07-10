using InMeal.Core.Entities;
using InMeal.Core.Globalisation;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class IngredientMemento : EntityMemento, IHaveName
{
    public IngredientMemento(Ingredient ingredient)
    {
        Id = ingredient.Id.Key;
        Name = ingredient.Name;
    }

    public Guid Id { get; private set; }

    public string Name { get; private set; }
}