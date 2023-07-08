using InMeal.Core.Entities;

namespace InMeal.DTOs.Recipes;

public record RecipeIngredientDto(string Label, RecipeIngredientId IngredientId, Quantity Quantity);
