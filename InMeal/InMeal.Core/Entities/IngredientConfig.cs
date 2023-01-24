using InMeal.Core.Globalisation.Generators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.Entities;

public class IngredientConfig
{
    public void Configure(EntityTypeBuilder<Ingredient> builder)
    {
        builder.ToTable(nameof(Ingredient));

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder.Property(e => e.Name).IsRequired();
    }
}
