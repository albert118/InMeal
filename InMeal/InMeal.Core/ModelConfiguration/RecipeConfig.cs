using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Globalisation.Generators;
using InMeal.Core.Mementos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InMeal.Core.ModelConfiguration;

public class RecipeConfig
{
    public void Configure(EntityTypeBuilder<RecipeMemento> builder)
    {
        builder.ToTable(nameof(Recipe));

        builder.HasKey(e => e.Id);

        // TODO: this ID generator shouldn't be needed now that we handle this on the app-ef memento mapping
        builder.Property(e => e.Id).HasValueGenerator<NewIdGenerator>();

        builder.Property(e => e.MealType).HasDefaultValue(MealType.Unknown);
        builder.Property(e => e.CourseType).HasDefaultValue(MealCourse.Unknown);

        builder
            .HasMany(e => e.RecipeIngredients)
            .WithOne(e => e.Recipe)
            .HasForeignKey(e => e.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
