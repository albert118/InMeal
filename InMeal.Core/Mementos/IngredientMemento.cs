using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Globalisation;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class IngredientMemento : EntityMemento, IHaveName, IArchivable
{
    private IngredientMemento() { }

    internal IngredientMemento(Ingredient ingredient)
    {
        Id = ingredient.Id.Key;
        Name = ingredient.Name;
        Unit = ingredient.Unit;
    }

    public Guid Id { get; private set; }

    public string Name { get; private set; }
    
    public MeasurementUnit Unit { get; private set; }
    
    public bool IsArchived { get; set; }
}