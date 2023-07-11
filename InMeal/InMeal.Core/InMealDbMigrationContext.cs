using InMeal.Core.Globalisation.Converters;
using InMeal.Core.Mementos;
using InMeal.Core.ModelConfiguration;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Core;

public class InMealDbMigrationContext : DbContext
{
    public InMealDbMigrationContext(DbContextOptions opts) : base(opts) { }

    public DbSet<IngredientMemento> Ingredients => Set<IngredientMemento>();

    public DbSet<RecipeIngredientMemento> RecipeIngredients => Set<RecipeIngredientMemento>();

    public DbSet<RecipeMemento> Recipes => Set<RecipeMemento>();

    public DbSet<RecipeCategoryMemento> RecipeCategories => Set<RecipeCategoryMemento>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ConfigureRecipeDbModels();
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {
        builder.AddEnumConversions();
    }
}
