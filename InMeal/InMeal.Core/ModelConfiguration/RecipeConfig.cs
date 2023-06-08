using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Generators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.ModelConfiguration;

public class RecipeConfig
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable(nameof(Recipe));

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder
            .HasOne(e => e.RecipePhoto)
            .WithOne(e => e.Recipe)
            .HasForeignKey<RecipePhoto>(e => e.RecipeId)
            .OnDelete(DeleteBehavior.Cascade)
            // optionally upload a photo
            .IsRequired(false);

        builder
            .HasMany(e => e.RecipeIngredients)
            .WithOne(e => e.Recipe)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
