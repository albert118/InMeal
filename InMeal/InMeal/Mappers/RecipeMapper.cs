﻿using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.DTOs;
using InMeal.DTOs.Recipes;

namespace InMeal.Mappers;

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
