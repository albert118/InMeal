using InMeal.Core.Entities;

namespace InMeal.DTOs.Recipes;

public record RecipeIngredientDto(string Label, Guid IngredientId, Quantity Quantity);