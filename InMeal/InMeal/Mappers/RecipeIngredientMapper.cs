using System.Collections.ObjectModel;
using InMeal.Core.Entities;
using InMeal.DTOs.Recipes;

namespace InMeal.Mappers;

public static class RecipeIngredientMapper
{
    public static Dictionary<Guid, RecipeIngredientDto> ToDto(
        IEnumerable<RecipeIngredient> recipeIngredients)
    {
        // RecipeIngredientId as the key
        return recipeIngredients.ToDictionary(ri => ri.Id.Key, ToDto);
    }

    public static RecipeIngredientDto ToDto(RecipeIngredient recipeIngredient)
    {
        return new(
            recipeIngredient.Ingredient?.Name ?? string.Empty,
            recipeIngredient.Ingredient?.Id.Key ?? Guid.Empty,
            recipeIngredient.Quantity
        );
    }

    public static IReadOnlyDictionary<RecipeIngredientId, RecipeIngredient> FromDto(
        Dictionary<Guid, RecipeIngredientDto> recipeIngredients, RecipeId recipeId)
    {
        var returnValue = recipeIngredients.ToDictionary(
            kvp => new RecipeIngredientId(kvp.Key),
            kvp => FromDto(kvp.Value, recipeId, new RecipeIngredientId(kvp.Key))
        );

        return new ReadOnlyDictionary<RecipeIngredientId, RecipeIngredient>(returnValue);
    }

    public static RecipeIngredient FromDto(RecipeIngredientDto dto, RecipeId recipeId,
        RecipeIngredientId recipeIngredientId)
    {
        return new(
            recipeIngredientId,
            quantity: dto.Quantity,
            recipeId: recipeId,
            ingredient: new Ingredient(new(dto.IngredientId), dto.Label)
        );
    }
}