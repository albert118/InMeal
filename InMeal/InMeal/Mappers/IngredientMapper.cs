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
}
