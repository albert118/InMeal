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

    private Ingredient(IngredientMemento memento)
    {
        Id = new(memento.Id);
        Name = memento.Name;
    }

    public static Ingredient FromMemento(IngredientMemento memento) => new(memento);

    public IngredientId Id { get; set; }

    public string Name { get; set; }

    public IngredientMemento State => new(this);
}

public class IngredientId : Identity<Guid>
{
    public IngredientId(Guid id) : base(id) { }
}