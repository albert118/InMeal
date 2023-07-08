using System.Collections.ObjectModel;
using InMeal.Core.Entities;
using InMeal.DTOs.Recipes;

namespace InMeal.Mappers;

public static class RecipeIngredientMapper
{
    public static Dictionary<RecipeIngredientId, RecipeIngredientDto> ToDto(IEnumerable<RecipeIngredient> recipeIngredients)
    {
        return recipeIngredients.ToDictionary(ri => ri.Id, ToDto);
    }

    public static RecipeIngredientDto ToDto(RecipeIngredient recipeIngredient)
    {
        return new(
            Label: recipeIngredient.Ingredient.Name,
            IngredientId: recipeIngredient.Ingredient.Id,
            Quantity: recipeIngredient.Quantity
        );
    }

    public static IReadOnlyDictionary<RecipeIngredientId, RecipeIngredient> FromDto(Dictionary<RecipeIngredientId, RecipeIngredientDto> recipeIngredients, RecipeId recipeId)
    {
        var returnValue = recipeIngredients.ToDictionary(
            kvp => kvp.Key, 
            kvp => FromDto(kvp.Value, recipeId, kvp.Key)
        );

        return new ReadOnlyDictionary<RecipeIngredientId, RecipeIngredient>(returnValue);
    }

    public static RecipeIngredient FromDto(RecipeIngredientDto dto, RecipeId recipeId, RecipeIngredientId recipeIngredientId)
    {
        return new(
            id: recipeIngredientId,
            quantity: dto.Quantity,
            recipeId: recipeId,
            ingredient: new Ingredient(dto.IngredientId, dto.Label)
        );
    }
}