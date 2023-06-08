using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.Core.Mappers;

public static class RecipeCategoryMapper
{
    public static RecipeCategoryDto ToDto(RecipeCategory recipeCategory)
    {
        return new(
            RecipeTitle: recipeCategory.Recipe.Title,
            RecipeCategory: recipeCategory.Category,
            RecipeId: recipeCategory.RecipeId
        );
    }
}
