using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Generators;
using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace InMeal.Core.ModelConfiguration;

public class RecipeIngredientConfig
{
    public void Configure(EntityTypeBuilder<RecipeIngredientMemento> builder)
    {
        builder.ToTable(nameof(RecipeIngredient));

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder
            .HasOne(e => e.Ingredient)
            .WithMany()
            .HasForeignKey(e => e.IngredientId);

        builder.Property(e => e.Quantity).IsRequired();
    }
}
