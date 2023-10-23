using InMeal.Api.DTOs.Recipes;
using InMeal.Core.Entities;

namespace InMeal.Api.Mappers;

public static class RecipeIngredientMapper
{
    public static RecipeIngredientDto ToDto(RecipeIngredient recipeIngredient)
    {
        if (recipeIngredient.Ingredient == null)
            throw new ArgumentException($"{nameof(RecipeIngredient)} ingredient was found to be null while mapping to DTO");

        return new(
            Id: recipeIngredient.Id.Key,
            Label: recipeIngredient.Ingredient?.Name ?? string.Empty,
            IngredientId: recipeIngredient.Ingredient?.Id.Key ?? Guid.Empty,
            Quantity: recipeIngredient.Quantity,
            Units:  MeasurementMapper.ToDto(recipeIngredient.Ingredient!.Unit)
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