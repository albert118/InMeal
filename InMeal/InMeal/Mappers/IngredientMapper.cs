using InMeal.Core.Entities;
using InMeal.DTOs.Ingredients;

namespace InMeal.Mappers;

public static class IngredientMapper
{
    public static IngredientDto MapToIngredientDto(this Ingredient ingredient)
    {
        return new(
            ingredient.Id.Key,
            ingredient.Name
        );
    }

    public static AlphabeticallyIndexedIngredientDto MapToAlphabeticallyIndexedIngredientDto(this Ingredient ingredient,
        Dictionary<IngredientId, int> recipeIngredientUsageCounts)
    {
        recipeIngredientUsageCounts.TryGetValue(ingredient.Id, out var recipeUsageCount);

        return new(
            ingredient.Id.Key,
            ingredient.Name,
            recipeUsageCount
        );
    }

    public static Dictionary<string, List<AlphabeticallyIndexedIngredientDto>> MapToAlphabeticallyIndexedIngredientsDto(
        Dictionary<string, List<Ingredient>> values, Dictionary<IngredientId, int> usageCounts)
    {
        return values.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value
                      .Select(v => MapToAlphabeticallyIndexedIngredientDto(v, usageCounts))
                      .ToList()
        );
    }
}