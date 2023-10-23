using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace InMeal.Infrastructure.Interfaces.Data;

public interface IRecipeDbContext
{
    DbSet<IngredientMemento> Ingredients { get; }

    DbSet<RecipeCategoryMemento> RecipeCategories { get; }

    DbSet<RecipeIngredientMemento> RecipeIngredients { get; }

    DbSet<RecipeMemento> Recipes { get; }

    Task<int> SaveChangesAsync(CancellationToken ct);

    EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
}
