using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Generators;
using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.ModelConfiguration;

public class RecipeCategoryConfig
{
    public void Configure(EntityTypeBuilder<RecipeCategoryMemento> builder)
    {
        builder.ToTable(nameof(RecipeCategory));

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder.Property(e => e.Category).IsRequired();
        builder.Property(e => e.RecipeId).IsRequired();

        // ie. a recipe may have one category
        builder.HasIndex(e => new { e.RecipeId, e.Category }).IsUnique();
    }
}
