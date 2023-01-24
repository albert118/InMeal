using InMeal.Core.Entities;

namespace InMeal.Core.DTOs;

public record RecipeIngredientDto(string Label, Guid IngredientId, Quantity Quantity);
