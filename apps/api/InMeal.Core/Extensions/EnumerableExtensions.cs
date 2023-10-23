using InMeal.Core.Globalisation;

namespace InMeal.Core.Extensions;

public static class EnumerableExtensions
{
    public static IEnumerable<IGrouping<string, TSource>> GroupAlphabetically <TSource>(this IEnumerable<TSource> source, string defaultKey = "#")
        where TSource : IHaveName
    {
        return source.GroupBy(e =>
        {
            var firstLetter = e.Name.First().ToString();
            return RegexPatterns.IsAlphaChar(firstLetter) ? firstLetter : defaultKey;
        });
    }
}