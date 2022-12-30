using InMeal.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Core;

public class InMealDbMigrationContext : DbContext
{
    public InMealDbMigrationContext(DbContextOptions opts) : base(opts) { }

    public DbSet<Ingredient> Ingredients => Set<Ingredient>();

    public DbSet<Recipe> Recipes => Set<Recipe>();

    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    public DbSet<RecipePhoto> RecipePhotos => Set<RecipePhoto>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        new IngredientConfig().Configure(builder.Entity<Ingredient>());

        new RecipeConfig().Configure(builder.Entity<Recipe>());

        new RecipeIngredientConfig().Configure(builder.Entity<RecipeIngredient>());

        new RecipePhotoConfig().Configure(builder.Entity<RecipePhoto>());
    }
}
