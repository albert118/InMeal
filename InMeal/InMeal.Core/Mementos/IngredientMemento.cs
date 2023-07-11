using InMeal.Core.Globalisation;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class IngredientMemento : EntityMemento, IHaveName, IArchivable
{
    private IngredientMemento() { }

    internal IngredientMemento(Guid id, string name)
    {
        Id = id;
        Name = name;
    }

    public Guid Id { get; private set; }

    public string Name { get; private set; }
    
    public bool IsArchived { get; set; }
}