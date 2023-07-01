using InMeal.Core.Entities;

namespace InMeal.Core.DTOs;

public record RecipeIngredientDto(string Label, RecipeIngredientId IngredientId, Quantity Quantity);
