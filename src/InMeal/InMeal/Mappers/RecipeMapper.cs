using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.Mappers;

public static class RecipeMapper
{
    public static RecipeDto ToDto(Recipe recipe)
    {
        return new(
            recipe.Id,
            recipe.Title ?? "NO TITLE YIKES",
            recipe.Blurb,
            recipe.PreparationSteps.Split(';').ToList(), // todo while testing and mucking around
            recipe.CookTime,
            recipe.PrepTime,
            recipe.RecipeIngredients
                .Select(ri => new AddRecipeIngredientDto(ri.Ingredient.Name, ri.Id, ri.Quantity))
                .ToList()
        );
    }

    public static UpcomingRecipe ToUpcoming(Recipe recipe)
    {
        return new(
            recipe.Id,
            ToDto(recipe),
            recipe.Title ?? "NO TITLE YIKES",
            PreparationStatus.Unknown,
            new(
                recipe.Title ?? "NO TITLE YIKES",
                "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif"
            )
        );
    }
}
