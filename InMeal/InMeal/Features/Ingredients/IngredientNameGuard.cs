namespace InMeal.Features.Ingredients;

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

    private static IEnumerable<string> EnforceLowercaseNames(this IEnumerable<string> values) =>
        values.Select(v => v.ToLowerInvariant());

    private static IEnumerable<string> EnforceUniqueNames(this IEnumerable<string> values) => values.Distinct();
    
    private static IEnumerable<string> EnsureNoExcessWhitespace(this IEnumerable<string> values) => values.Select(v => v.Trim());
}