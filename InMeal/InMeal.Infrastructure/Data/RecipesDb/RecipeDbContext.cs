using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Converters;
using InMeal.Core.ModelConfiguration;
using InMeal.Infrastructure.Interfaces.Data;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Data.RecipesDb;

public class RecipeDbContext : AsyncDbContext, IRecipeDbContext
{
    public RecipeDbContext(DbContextOptions<RecipeDbContext> options) : base(options) { }

    public RecipeDbContext(DbContextOptions opts) : base(opts) { }

    // public DbSet<RecipeCategory> RecipeCategories => Set<RecipeCategory>();

    public DbSet<Ingredient> Ingredients => Set<Ingredient>();

    public DbSet<RecipePhoto> RecipePhotos => Set<RecipePhoto>();

    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    public DbSet<Recipe> Recipes => Set<Recipe>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ConfigureRecipeDbModels();
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {
        builder.AddEnumConversions();
    }
}
