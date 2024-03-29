using System.Diagnostics.CodeAnalysis;

namespace InMeal.Core.Kernel;

public interface IIdentity<out T> where T : notnull
{
    T Key { get; }
}

public abstract class Identity<T> : IEquatable<Identity<T>>, IIdentity<T> 
    where T : notnull
{
    protected Identity([DisallowNull] T id)
    {
        Key = id;
    }

    public bool Equals(Identity<T>? other)
    {
        if (ReferenceEquals(null, other)) return false;
        if (ReferenceEquals(this, other)) return true;
        return EqualityComparer<T>.Default.Equals(Key, other.Key);
    }

    public T Key { get; }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != GetType()) return false;
        return Equals((Identity<T>)obj);
    }
    
    public static bool operator ==(Identity<T>? obj1, Identity<T>? obj2)
    {
        return Equals(obj1, obj2);
    }
    
    public static bool operator !=(Identity<T>? obj1, Identity<T>? obj2)
    {
        return !Equals(obj1, obj2);
    }
    
    public override int GetHashCode()
    {
        return EqualityComparer<T>.Default.GetHashCode(Key);
    }
    
    public override string ToString()
    {
        return GetType().Name + " [Id=" + Key + "]";
    }
}