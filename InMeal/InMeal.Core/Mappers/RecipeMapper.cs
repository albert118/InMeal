using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;

namespace InMeal.Core.Mappers;

public static class RecipeMapper
{
    public static RecipeDto ToDto(Recipe recipe)
    {
        return new(
            recipe.Id,
            recipe.Title,
            recipe.Blurb,
            recipe.PreparationSteps,
            recipe.CookTime,
            recipe.PrepTime,
            recipe.RecipeIngredients
                .Select(ri => new RecipeIngredientDto(ri.Ingredient.Name, ri.Id, ri.Quantity))
                .ToDictionary(ri => ri.IngredientId)
        );
    }

    public static Recipe FromDto(RecipeDto dto)
    {
        // TODO: map RecipeIngredients
        return new(
            dto.Title,
            dto.Blurb,
            dto.PreparationSteps,
            dto.CookTime,
            dto.PrepTime
        );
    }

    public static UpcomingRecipe ToUpcoming(Recipe recipe)
    {
        return new(
            recipe.Id,
            ToDto(recipe),
            recipe.Title,
            PreparationStatus.Unknown.ToString().ToLowerInvariant(),
            new(
                "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif"
            )
        );
    }

    public static RecommendedRecipe ToRecommended(Recipe recipe)
    {
        return new(
            recipe.Id,
            ToDto(recipe),
            recipe.Title,
            PreparationStatus.Unknown.ToString().ToLowerInvariant(),
            new(
                "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif"
            )
        );
    }
}
