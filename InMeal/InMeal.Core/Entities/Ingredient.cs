using InMeal.Core.Globalisation;
using InMeal.Core.Kernel;

namespace InMeal.Core.Entities;

public class Ingredient : IHaveState<IngredientMemento>, IHaveName
{
    public Ingredient(string name)
    {
        if (string.IsNullOrEmpty(name))
            throw new ArgumentException($"{nameof(Ingredient)} cannot be created without a name");

        Id = new IngredientId(Guid.NewGuid());
        Name = name.ToLowerInvariant().Trim();
    }

    private Ingredient(IngredientMemento memento)
    {
        Id = memento.Id;
        Name = memento.Name;
    }

    public IngredientId Id { get; set; }

    public string Name { get; set; }
}

public class IngredientId : Identity<Guid>
{
    public IngredientId(Guid id) : base(id) { }
}