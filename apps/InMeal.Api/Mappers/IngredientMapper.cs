﻿using InMeal.Api.DTOs.Ingredients;
using InMeal.Core.Entities;

namespace InMeal.Api.Mappers;

public static class IngredientMapper
{
    public static IngredientDto MapToIngredientDto(this Ingredient ingredient, string fakeUrl)
    {
        return new(
            Id: ingredient.Id.Key,
            Name: ingredient.Name,
            Units: MeasurementMapper.ToDto(ingredient.Unit),
            Image: new(fakeUrl)
        );
    }
    
    public static IngredientDetailDto ToDto(this Ingredient ingredient, Dictionary<IngredientId, int> usageCounts)
    {
        usageCounts.TryGetValue(ingredient.Id, out var usageCount);

        return new(
            Id: ingredient.Id.Key,
            Name: ingredient.Name,
            Units: MeasurementMapper.ToDto(ingredient.Unit),
            RecipeUsageCount: usageCount
        );
    }

    public static AlphabeticallyIndexedIngredientDto MapToAlphabeticallyIndexedIngredientDto(this Ingredient ingredient,
        Dictionary<IngredientId, int> recipeIngredientUsageCounts, string fakeUrl)
    {
        recipeIngredientUsageCounts.TryGetValue(ingredient.Id, out var recipeUsageCount);

        return new(
            IngredientId: ingredient.Id.Key,
            Name: ingredient.Name,
            RecipeUsageCount: recipeUsageCount,
            Units: MeasurementMapper.ToDto(ingredient.Unit),
            Image: new(fakeUrl)
        );
    }

    public static Dictionary<string, List<AlphabeticallyIndexedIngredientDto>> MapToAlphabeticallyIndexedIngredientsDto(
        Dictionary<string, List<Ingredient>> values, Dictionary<IngredientId, int> usageCounts, string fakeUrl)
    {
        return values.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value
                      .Select(v => MapToAlphabeticallyIndexedIngredientDto(v, usageCounts, fakeUrl))
                      .ToList()
        );
    }
}