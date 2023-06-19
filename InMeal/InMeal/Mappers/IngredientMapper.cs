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

    public static AlphabeticallyIndexedIngredientDto MapToAlphabeticallyIndexedIngredientDto(this Ingredient ingredient)
    {
        return new(
            Id: ingredient.Id,
            Name: ingredient.Name,
            // TODO
            RecipeUsageCount: 0
        );
    }

    public static Dictionary<string, List<AlphabeticallyIndexedIngredientDto>> MapToAlphabeticallyIndexedIngredientsDto(
        this Dictionary<string, List<Ingredient>> values)
    {
        return values.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value.Select(MapToAlphabeticallyIndexedIngredientDto).ToList()
        );
    }
}
