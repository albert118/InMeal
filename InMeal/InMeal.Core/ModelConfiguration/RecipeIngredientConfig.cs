﻿using InMeal.Core.Entities;
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

        // ensure quantity is serialized and deserialized
        // also ensure it is always required (never null)
        builder
            .Property(e => e.Quantity).HasConversion(
                data => JsonConvert.SerializeObject(data),
                data => JsonConvert.DeserializeObject<Quantity>(
                    data,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}
                )!
            ).IsRequired();
    }
}
