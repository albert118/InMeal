namespace InMeal.Api.Features.Ingredients;

public static class IngredientNameGuard
{
    public static List<string> Apply(IEnumerable<string> names)
    {
        return names
               .Where(n => !string.IsNullOrEmpty(n))
               .EnforceLowercaseNames()
               .EnforceUniqueNames()
               .EnsureNoExcessWhitespace()
               .ToList();
    }

    private static IEnumerable<string> EnforceLowercaseNames(this IEnumerable<string> values)
    {
        return values.Select(v => v.ToLowerInvariant());
    }

    private static IEnumerable<string> EnforceUniqueNames(this IEnumerable<string> values)
    {
        return values.Distinct();
    }

    private static IEnumerable<string> EnsureNoExcessWhitespace(this IEnumerable<string> values)
    {
        return values.Select(v => v.Trim());
    }
}