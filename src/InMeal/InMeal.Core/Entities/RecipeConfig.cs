using InMeal.Core.Globalisation.Generators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.Entities;

public class RecipeConfig
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable(nameof(Recipe));

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder
            .HasOne<RecipePhoto>()
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade)
            // optionally upload a photo
            .IsRequired(false);

        builder
            .HasMany<RecipeIngredient>()
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
