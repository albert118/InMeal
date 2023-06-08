using InMeal.Core.Entities;
using InMeal.Core.Globalisation.Generators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.ModelConfiguration;

public class RecipePhotoConfig
{
    public void Configure(EntityTypeBuilder<RecipePhoto> builder)
    {
        builder.ToTable(nameof(RecipePhoto));

        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder.Property(e => e.FileName).IsRequired();

        builder.Property(e => e.Bytes).IsRequired();
    }
}
