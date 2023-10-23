using InMeal.Core.Enumerations;
using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class Ingredient : IHaveState<IngredientMemento>
{
    public Ingredient(IngredientId id, string name, MeasurementUnit unit = MeasurementUnit.Unknown)
    {
        if (string.IsNullOrEmpty(name))
            throw new ArgumentException($"{nameof(Ingredient)} cannot be created without a name");

        Id = id;
        Name = StandardiseName(name);
        Unit = unit;
    }
    
    public Ingredient(string name, MeasurementUnit unit = MeasurementUnit.Unknown)
    {
        if (string.IsNullOrEmpty(name))
            throw new ArgumentException($"{nameof(Ingredient)} cannot be created without a name");

        Id = new IngredientId(Guid.NewGuid());
        Name = name.ToLowerInvariant().Trim();
        Unit = unit;
    }

    private Ingredient(IngredientMemento memento)
    {
        Id = new(memento.Id);
        Name = memento.Name;
        Unit = memento.Unit;
    }

    public static Ingredient FromMemento(IngredientMemento memento) => new(memento);

    public void UpdateName(string newName)
    {
        if (string.IsNullOrEmpty(newName)) 
            throw new ArgumentException($"cannot update an {nameof(Ingredient)} with an empty name");

        Name = StandardiseName(newName);
    }

    public void UpdateMeasurement(MeasurementUnit newUnit)
    {
        if (newUnit == MeasurementUnit.Unknown)
            throw new ArgumentException($"cannot update an {nameof(Ingredient)} with an unknown measurement");

        Unit = newUnit;
    }

    public IngredientMemento State => new(this);

    public IngredientId Id { get; private set; }

    public string Name { get; private set; }
    
    public MeasurementUnit Unit { get; private set; }
    
    private static string StandardiseName(string name) => name.ToLowerInvariant().Trim();
}

public class IngredientId : Identity<Guid>
{
    public IngredientId(Guid id) : base(id) { }
}