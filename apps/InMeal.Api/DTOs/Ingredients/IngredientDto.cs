﻿using InMeal.Api.DTOs.Upcoming;

namespace InMeal.Api.DTOs.Ingredients;

public record IngredientDto(Guid Id, string Name, MeasurementUnitDto Units, Image Image);