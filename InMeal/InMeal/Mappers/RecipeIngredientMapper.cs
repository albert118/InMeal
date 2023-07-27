using InMeal.Core.Entities;
using InMeal.DTOs.Recipes;

namespace InMeal.Mappers;

public static class RecipeIngredientMapper
{
    public static RecipeIngredientDto ToDto(RecipeIngredient recipeIngredient)
    {
        return new(
            recipeIngredient.Id.Key,
            recipeIngredient.Ingredient?.Name ?? string.Empty,
            recipeIngredient.Ingredient?.Id.Key ?? Guid.Empty,
            recipeIngredient.Quantity
        );
    }

    public static List<RecipeIngredient> FromDto(IEnumerable<RecipeIngredientDto> recipeIngredients, RecipeId recipeId)
    {
        return recipeIngredients.Select(dto => FromDto(dto, recipeId)).ToList();
    }

    public static RecipeIngredient FromDto(RecipeIngredientDto dto, RecipeId recipeId)
    {
        return new(
            dto.Id.HasValue ? new RecipeIngredientId(dto.Id.Value) : new RecipeIngredientId(Guid.NewGuid()),
            quantity: dto.Quantity,
            recipeId: recipeId,
            ingredient: new Ingredient(new(dto.IngredientId), dto.Label)
        );
    }
}