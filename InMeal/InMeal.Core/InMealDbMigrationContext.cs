using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Converters;
using InMeal.Core.ModelConfiguration;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Core;

public class InMealDbMigrationContext : DbContext
{
    public InMealDbMigrationContext(DbContextOptions opts) : base(opts) { }

    public DbSet<Ingredient> Ingredients => Set<Ingredient>();

    public DbSet<RecipePhoto> RecipePhotos => Set<RecipePhoto>();

    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    public DbSet<Recipe> Recipes => Set<Recipe>();

    public DbSet<RecipeCategory> RecipeCategories => Set<RecipeCategory>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ConfigureRecipeDbModels();
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {
        builder.AddEnumConversions();
    }
}
