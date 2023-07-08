using InMeal.Core.Entities;
using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;

namespace InMeal.Core.ModelConfiguration;

public static class ModelBuilderExtensions
{
    public static ModelBuilder ConfigureRecipeDbModels(this ModelBuilder builder)
    {
        new IngredientConfig().Configure(builder.Entity<IngredientMemento>());

        new RecipeIngredientConfig().Configure(builder.Entity<RecipeIngredientMemento>());

        new RecipePhotoConfig().Configure(builder.Entity<RecipePhoto>());

        new RecipeConfig().Configure(builder.Entity<RecipeMemento>());

        new RecipeCategoryConfig().Configure(builder.Entity<RecipeCategoryMemento>());

        return builder;
    }
}
