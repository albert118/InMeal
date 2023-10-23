using System.Text.RegularExpressions;

namespace InMeal.Core.Globalisation;

public static class RegexPatterns
{
    public static bool IsAlphaChar(string value)
    {
        const string isAlphaChar = @"[a-zA-Z]";
        return Regex.IsMatch(value, isAlphaChar);
    }
}