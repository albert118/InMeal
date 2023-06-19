using System.Text.RegularExpressions;

namespace InMeal.Core.Globalisation;

public static class RegexPatterns
{
    public static bool IsAlphaChar(string value)
    {
        const string isAlphaChar = @"[a-z][A-Z]";
        return Regex.IsMatch(value, isAlphaChar);
    }
}