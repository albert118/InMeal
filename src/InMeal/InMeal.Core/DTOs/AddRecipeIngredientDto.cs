using InMeal.Core.Entities;

namespace InMeal.Core.DTOs;

public record AddRecipeIngredientDto(Guid IngredientId, Quantity Quantity);
