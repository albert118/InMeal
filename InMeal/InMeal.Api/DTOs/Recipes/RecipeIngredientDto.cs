using InMeal.Api.DTOs.Ingredients;

namespace InMeal.Api.DTOs.Recipes;

public record RecipeIngredientDto(Guid? Id, string Label, Guid IngredientId, int Quantity, MeasurementUnitDto Units);