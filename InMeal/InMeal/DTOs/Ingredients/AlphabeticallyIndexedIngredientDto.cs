using InMeal.Core.Entities;

namespace InMeal.DTOs.Ingredients;

public record AlphabeticallyIndexedIngredientDto(IngredientId Id, string Name, int RecipeUsageCount);
