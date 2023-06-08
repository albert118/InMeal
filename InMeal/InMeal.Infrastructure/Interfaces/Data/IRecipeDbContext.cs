using InMeal.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Interfaces.Data;

public interface IRecipeDbContext
{
    DbSet<Ingredient> Ingredients { get; }

    DbSet<RecipePhoto> RecipePhotos { get; }

    DbSet<RecipeCategory> RecipeCategories { get; }

    DbSet<RecipeIngredient> RecipeIngredients { get; }

    DbSet<Recipe> Recipes { get; }

    Task<int> SaveChangesAsync(CancellationToken ct);
}
