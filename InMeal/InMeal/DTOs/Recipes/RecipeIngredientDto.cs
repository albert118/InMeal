using InMeal.Core.Entities;

namespace InMeal.DTOs.Recipes;

public record RecipeIngredientDto(Guid? Id, string Label, Guid IngredientId, Quantity Quantity);