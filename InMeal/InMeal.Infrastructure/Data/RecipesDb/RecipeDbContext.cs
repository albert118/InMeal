using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.Data;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Infrastructure.Data.RecipesDb;

public class RecipeDbContext : AsyncDbContext, IRecipeDbContext
{
    public RecipeDbContext(DbContextOptions<RecipeDbContext> options) : base(options) { }

    public RecipeDbContext(DbContextOptions opts) : base(opts) { }

    public DbSet<Ingredient> Ingredients => Set<Ingredient>();

    public DbSet<RecipePhoto> RecipePhotos => Set<RecipePhoto>();

    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    public DbSet<Recipe> Recipes => Set<Recipe>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        new IngredientConfig().Configure(builder.Entity<Ingredient>());

        new RecipeIngredientConfig().Configure(builder.Entity<RecipeIngredient>());

        new RecipePhotoConfig().Configure(builder.Entity<RecipePhoto>());

        new RecipeConfig().Configure(builder.Entity<Recipe>());
    }
}