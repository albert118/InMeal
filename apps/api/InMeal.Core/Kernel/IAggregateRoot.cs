namespace InMeal.Core.Kernel;

public interface IAggregateRoot { }

public interface IHaveState<out TState> where TState : EntityMemento
{
    TState State { get; }
}