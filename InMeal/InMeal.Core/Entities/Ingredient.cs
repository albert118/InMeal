using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class Ingredient : IHaveState<IngredientMemento>
{
    public Ingredient(string name)
    {
        if (string.IsNullOrEmpty(name))
            throw new ArgumentException($"{nameof(Ingredient)} cannot be created without a name");

        Id = new IngredientId(Guid.NewGuid());
        Name = name.ToLowerInvariant().Trim();
    }
    
    public Ingredient(IngredientId id, string name)
    {
        if (string.IsNullOrEmpty(name))
            throw new ArgumentException($"{nameof(Ingredient)} cannot be created without a name");

        Id = id;
        Name = name.ToLowerInvariant().Trim();
    }

    public static Ingredient FromMemento(IngredientMemento memento) => new(new IngredientId(memento.Id), memento.Name);

    public void UpdateName(string newName)
    {
        if (string.IsNullOrEmpty(newName))
            throw new ArgumentException($"cannot update an {nameof(Ingredient)} with an empty name");

        Name = newName;
    }

    public IngredientMemento State => new(this);

    public IngredientId Id { get; private set; }

    public string Name { get; private set; }
}

public class IngredientId : Identity<Guid>
{
    public IngredientId(Guid id) : base(id) { }
}