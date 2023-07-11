using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.DTOs.Recipes;

namespace InMeal.Mappers;

public static class RecipeMapper
{
    public static RecipeDto ToDto(Recipe recipe)
    {
        return new(
            recipe.Id.Key,
            recipe.Title,
            recipe.Blurb,
            recipe.PreparationSteps,
            recipe.CookTime,
            recipe.PrepTime,
            recipe.RecipeIngredients.Select(RecipeIngredientMapper.ToDto).ToList()
        );
    }

    public static RecommendedRecipe ToRecommended(Recipe recipe)
    {
        return new(
            recipe.Id.Key,
            ToDto(recipe),
            recipe.Title,
            PreparationStatus.Unknown.ToString().ToLowerInvariant(),
            new(
                "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif"
            )
        );
    }
}