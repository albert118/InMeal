namespace InMeal.Core.Globalisation;

public static class GuidExtensions
{
    public static bool IsEmpty(this Guid guid) => guid == Guid.Empty;

    public static bool IsNullOrEmpty(this Guid? guid) => !guid.HasValue || guid == Guid.Empty;
}