using InMeal.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Core.ModelConfiguration;

public static class ModelBuilderExtensions
{
    public static ModelBuilder ConfigureRecipeDbModels(this ModelBuilder builder)
    {
        new IngredientConfig().Configure(builder.Entity<Ingredient>());

        new RecipeIngredientConfig().Configure(builder.Entity<RecipeIngredient>());

        new RecipePhotoConfig().Configure(builder.Entity<RecipePhoto>());

        new RecipeConfig().Configure(builder.Entity<Recipe>());

        new RecipeCategoryConfig().Configure(builder.Entity<RecipeCategory>());

        return builder;
    }
}
