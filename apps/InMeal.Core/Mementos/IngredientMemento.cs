using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Globalisation;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class IngredientMemento : EntityMemento, IHaveName, IArchivable
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    // required for EF Core reflection logic - in this case it's perfectly fine we don't populate fields
    private IngredientMemento() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

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