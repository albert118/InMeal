using InMeal.Core.Entities;
using InMeal.DTOs;

namespace InMeal.Mappers;

public static class RecipeCategoryMapper
{
    public static RecipeCategoryDto ToDto(RecipeCategory dto)
    {
        return new(
            RecipeTitle: dto.Recipe.Title,
            RecipeCategory: dto.Category,
            RecipeId: dto.Recipe.Id
        );
    }
}