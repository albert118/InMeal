﻿using InMeal.Api.DTOs.Recipes;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;

namespace InMeal.Api.Mappers;

public static class RecipeMapper
{
    public static RecipeDto ToDto(Recipe recipe, string fakeUrl)
    {
        return new(
            recipe.Id.Key,
            recipe.Title,
            recipe.Blurb,
            recipe.PreparationSteps,
            recipe.CookTime,
            recipe.PrepTime,
            recipe.Servings,
            recipe.RecipeIngredients.Select(RecipeIngredientMapper.ToDto).ToList(),
            recipe.GetCategoryName(),
            recipe.CourseType,
            recipe.MealType,
            new(fakeUrl)
        );
    }
    
    public static RecipeDetailDto ToDetailDto(Recipe recipe, string fakeUrl)
    {
        return new(
            Id: recipe.Id.Key,
            Title: recipe.Title,
            CookTime: recipe.CookTime,
            PrepTime: recipe.PrepTime,
            Servings: recipe.Servings,
            IngredientsCount: recipe.RecipeIngredients.Count,
            Category: recipe.GetCategoryName().ToString(),
            Course: recipe.CourseType.ToString(),
            Type: recipe.MealType.ToString(),
            Image: new(fakeUrl)
        );
    }

    public static RecommendedRecipe ToRecommended(Recipe recipe, string fakeUrl)
    {
        return new(
            recipe.Id.Key,
            ToDto(recipe, fakeUrl),
            recipe.Title,
            PreparationStatus.Unknown.ToString().ToLowerInvariant()
        );
    }

    public static RecipesByCourseDto ToDto(Dictionary<MealCourse, List<Recipe>> recipes, string fakeUrl)
    {
        return new(recipes.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value.Select(r => ToDetailDto(r, fakeUrl)).ToList()
        ));
    }
}