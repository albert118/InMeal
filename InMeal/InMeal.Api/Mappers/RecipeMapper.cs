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
            recipe.Servings,
            recipe.RecipeIngredients.Select(RecipeIngredientMapper.ToDto).ToList(),
            recipe.GetCategoryName(),
            recipe.CourseType,
            recipe.MealType
        );
    }
    
    public static RecipeDetailDto ToDetailDto(Recipe recipe)
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
            Type: recipe.MealType.ToString()
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

    public static RecipesByCourseDto ToDto(Dictionary<MealCourse, List<Recipe>> recipes)
    {
        return new(recipes.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value.Select(ToDetailDto).ToList()
        ));
    }
}