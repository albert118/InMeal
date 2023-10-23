using InMeal.Core.Entities;
using InMeal.DTOs.Recipes;

namespace InMeal.Mappers;

public static class RecipeCategoryMapper
{
    public static RecipeCategoryDto ToDto(RecipeCategory recipeCategory)
    {
        return new(
            "WHAT IF I DIDN'T NEED THIS THOUGH???",
            recipeCategory.Category,
            recipeCategory.RecipeId.Key
        );
    }
}