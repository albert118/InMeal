using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.Mappers;

public static class IngredientMapper
{
    public static IngredientDto MapToIngredientDto(this Ingredient ingredient)
    {
        return new(
            Id: ingredient.Id,
            Name: ingredient.Name
        );
    }

    public static AlphabeticallyIndexedIngredientDto MapToAlphabeticallyIndexedIngredientDto(this Ingredient ingredient, Dictionary<Guid, int> recipeIngredientUsageCounts)
    {
        recipeIngredientUsageCounts.TryGetValue(ingredient.Id, out var recipeUsageCount);

        return new(
            Id: ingredient.Id,
            Name: ingredient.Name,
            RecipeUsageCount: recipeUsageCount
        );
    }

    public static Dictionary<string, List<AlphabeticallyIndexedIngredientDto>> MapToAlphabeticallyIndexedIngredientsDto(
        this Dictionary<string, List<Ingredient>> values, Dictionary<Guid, int> recipeIngredientUsageCounts)
    {
        return values.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value.Select(v => MapToAlphabeticallyIndexedIngredientDto(v, recipeIngredientUsageCounts)).ToList()
        );
    }
}
