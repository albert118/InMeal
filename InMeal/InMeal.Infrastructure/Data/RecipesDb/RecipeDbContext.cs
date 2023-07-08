using InMeal.Core.Globalisation.Converters;
using InMeal.Core.Mementos;
using InMeal.Core.ModelConfiguration;
using InMeal.Infrastructure.Interfaces.Data;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Data.RecipesDb;

public class RecipeDbContext : AsyncDbContext, IRecipeDbContext
{
    public RecipeDbContext(DbContextOptions<RecipeDbContext> options) : base(options) { }

    public RecipeDbContext(DbContextOptions opts) : base(opts) { }

    public DbSet<RecipeCategoryMemento> RecipeCategories => Set<RecipeCategoryMemento>();

    public DbSet<IngredientMemento> Ingredients => Set<IngredientMemento>();

    public DbSet<RecipePhotoMemento> RecipePhotos => Set<RecipePhotoMemento>();

    public DbSet<RecipeIngredientMemento> RecipeIngredients => Set<RecipeIngredientMemento>();

    public DbSet<RecipeMemento> Recipes => Set<RecipeMemento>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ConfigureRecipeDbModels();
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {
        builder.AddEnumConversions();
    }
}
