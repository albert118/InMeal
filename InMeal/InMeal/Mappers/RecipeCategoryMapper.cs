using InMeal.Core.Entities;
using InMeal.DTOs;
using InMeal.DTOs.Recipes;

namespace InMeal.Mappers;

public static class RecipeCategoryMapper
{
    public static RecipeCategoryDto ToDto(RecipeCategory recipeCategory)
    {
        // TODO: map the title here
        return new(
            RecipeTitle: "need to map the title",
            RecipeCategory: recipeCategory.Category,
            RecipeId: recipeCategory.RecipeId
        );
    }
}