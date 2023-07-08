using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Interfaces.Data;

public interface IRecipeDbContext
{
    DbSet<IngredientMemento> Ingredients { get; }

    DbSet<RecipeCategoryMemento> RecipeCategories { get; }

    DbSet<RecipeIngredientMemento> RecipeIngredients { get; }

    DbSet<RecipeMemento> Recipes { get; }

    Task<int> SaveChangesAsync(CancellationToken ct);
}
