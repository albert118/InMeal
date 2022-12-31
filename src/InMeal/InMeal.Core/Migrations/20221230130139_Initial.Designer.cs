﻿// <auto-generated />
using System;
using InMeal.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InMeal.Core.Migrations
{
    [DbContext(typeof(InMealDbMigrationContext))]
    [Migration("20221230130139_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("InMeal.Core.Entities.Ingredient", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Ingredient", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Entities.Recipe", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Blurb")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CookTime")
                        .HasColumnType("int");

                    b.Property<int>("PrepTime")
                        .HasColumnType("int");

                    b.Property<string>("PreparationSteps")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Servings")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Recipe", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Entities.RecipeIngredient", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("IngredientId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Quantity")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("RecipeId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("IngredientId");

                    b.HasIndex("RecipeId");

                    b.ToTable("RecipeIngredient", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Entities.RecipePhoto", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<byte[]>("Bytes")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("RecipeId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId")
                        .IsUnique();

                    b.ToTable("RecipePhoto", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Entities.RecipeIngredient", b =>
                {
                    b.HasOne("InMeal.Core.Entities.Ingredient", "Ingredient")
                        .WithMany()
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("InMeal.Core.Entities.Recipe", "Recipe")
                        .WithMany("RecipeIngredients")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ingredient");

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("InMeal.Core.Entities.RecipePhoto", b =>
                {
                    b.HasOne("InMeal.Core.Entities.Recipe", "Recipe")
                        .WithOne("RecipePhoto")
                        .HasForeignKey("InMeal.Core.Entities.RecipePhoto", "RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("InMeal.Core.Entities.Recipe", b =>
                {
                    b.Navigation("RecipeIngredients");

                    b.Navigation("RecipePhoto");
                });
#pragma warning restore 612, 618
        }
    }
}