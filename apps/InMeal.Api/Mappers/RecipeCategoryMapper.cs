using InMeal.Api.DTOs.Recipes;
using InMeal.Core.Entities;

namespace InMeal.Api.Mappers;

// TODO: simplify this
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