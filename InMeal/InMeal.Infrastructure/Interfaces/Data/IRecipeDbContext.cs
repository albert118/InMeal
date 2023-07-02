﻿using InMeal.Core.Entities;
using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Interfaces.Data;

public interface IRecipeDbContext
{
    DbSet<Ingredient> Ingredients { get; }

    DbSet<RecipePhotoMemento> RecipePhotos { get; }

    DbSet<RecipeCategory> RecipeCategories { get; }

    DbSet<RecipeIngredientMemento> RecipeIngredients { get; }

    DbSet<RecipeMemento> Recipes { get; }

    Task<int> SaveChangesAsync(CancellationToken ct);
}
