using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Generators;
using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.ModelConfiguration;

public class IngredientConfig
{
    public void Configure(EntityTypeBuilder<IngredientMemento> builder)
    {
        builder.ToTable(nameof(Ingredient));

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder.Property(e => e.Name).IsRequired();
        builder.Property(e => e.Unit).IsRequired();
    }
}
