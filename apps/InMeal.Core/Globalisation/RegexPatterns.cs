using System.Text.RegularExpressions;

namespace InMeal.Core.Globalisation;

public static class RegexPatterns
{
    public static bool IsAlphaChar(string value)
    {
        const string isAlphaChar = @"[a-zA-Z]";
        // TOOD: compile time constant generation of regex
        // TODO: search time limit on regex matching
        return Regex.IsMatch(value, isAlphaChar);
    }
}