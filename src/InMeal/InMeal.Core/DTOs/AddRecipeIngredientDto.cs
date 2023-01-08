using InMeal.Core.Entities;

namespace InMeal.Core.DTOs;

public record AddRecipeIngredientDto(string Label, Guid IngredientId, Quantity Quantity);
