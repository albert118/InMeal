using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Generators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.ModelConfiguration;

public class RecipeCategoryConfig
{
    // This is a dependent entity on the Recipe class
    // The 1-m relationship is defined on the parent/principal
    public void Configure(EntityTypeBuilder<RecipeCategory> builder)
    {
        builder.ToTable(nameof(RecipeCategory));

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();
    }
}
