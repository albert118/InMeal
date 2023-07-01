namespace InMeal.Core.Kernel;

public abstract class EntityMemento : IArchivable
{
    public bool isArchived { get; set; }
}